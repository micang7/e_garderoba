import { MigrationInterface, QueryRunner } from 'typeorm';

export class Name1769465359934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
CREATE OR REPLACE FUNCTION get_last_event_type(p_item_id INT)
RETURNS TEXT AS $$
DECLARE
    v_type TEXT;
BEGIN
    SELECT e."type"
    INTO v_type
    FROM events_items ei
    JOIN events e ON e."id" = ei."eventId"
    WHERE ei."itemId" = p_item_id
    ORDER BY e."createdAt" DESC
    LIMIT 1;

    RETURN v_type;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_rental(
    p_user_id INT,
    p_approved_by INT,
    p_item_ids INT[],
    p_purpose_type rental_details_purposetype_enum,
    p_purpose_description TEXT,
    p_planned_return_date TIMESTAMP
)
RETURNS TABLE(event_id INT, event_item_ids INT[]) AS $$
DECLARE
    v_event_id INT;
    v_item_id INT;
    v_event_item_id INT;
    v_event_item_ids INT[] := '{}';
    v_last_type TEXT;
BEGIN
    BEGIN
        INSERT INTO events ("type", "userId", "approvedBy")
        VALUES ('wypożyczenie', p_user_id, p_approved_by)
        RETURNING "id" INTO v_event_id;
    EXCEPTION
        WHEN foreign_key_violation THEN
            RAISE EXCEPTION 'User or approver does not exist' USING ERRCODE = 'P1001';
    END;

    IF (SELECT COUNT(*) FROM unnest(p_item_ids) x) <>
       (SELECT COUNT(DISTINCT x) FROM unnest(p_item_ids) x) THEN
        RAISE EXCEPTION 'Item list contains duplicates' USING ERRCODE = 'P1001';
    END IF;

    FOREACH v_item_id IN ARRAY p_item_ids LOOP
        PERFORM 1 FROM items WHERE "id" = v_item_id;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Item % does not exist', v_item_id USING ERRCODE = 'P1001';
        END IF;

        v_last_type := get_last_event_type(v_item_id);
        
        IF v_last_type IS NOT NULL AND v_last_type <> 'zwrot' THEN
            RAISE EXCEPTION 'Cannot rent item %, last event: %', v_item_id, v_last_type USING ERRCODE = 'P1001';
        END IF;
        
        INSERT INTO events_items ("eventId", "itemId")
        VALUES (v_event_id, v_item_id)
        RETURNING "id" INTO v_event_item_id;

        INSERT INTO rental_details ("id", "purposeType", "purposeDescription", "plannedReturnDate")
        VALUES (v_event_item_id, p_purpose_type, p_purpose_description, p_planned_return_date);

        v_event_item_ids := array_append(v_event_item_ids, v_event_item_id);
    END LOOP;

    event_id := v_event_id;
    event_item_ids := v_event_item_ids;

    RETURN QUERY
    SELECT event_id, event_item_ids;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_loss(
    p_user_id INT,
    p_approved_by INT,
    p_item_ids INT[],
    p_description TEXT
)
RETURNS TABLE(event_id INT, event_item_ids INT[]) AS $$
DECLARE
    v_event_id INT;
    v_item_id INT;
    v_event_item_id INT;
    v_event_item_ids INT[] := '{}';
    v_last_type TEXT;
BEGIN
    BEGIN
        INSERT INTO events ("type", "userId", "approvedBy")
        VALUES ('zagubienie', p_user_id, p_approved_by)
        RETURNING "id" INTO v_event_id;
    EXCEPTION
        WHEN foreign_key_violation THEN
            RAISE EXCEPTION 'User or approver does not exist' USING ERRCODE = 'P1001';
    END;
    
    IF (SELECT COUNT(*) FROM unnest(p_item_ids) x) <>
       (SELECT COUNT(DISTINCT x) FROM unnest(p_item_ids) x) THEN
        RAISE EXCEPTION 'Item list contains duplicates' USING ERRCODE = 'P1001';
    END IF;
    
    FOREACH v_item_id IN ARRAY p_item_ids LOOP
        PERFORM 1 FROM items WHERE "id" = v_item_id;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Item % does not exist', v_item_id USING ERRCODE = 'P1001';
        END IF;

        v_last_type := get_last_event_type(v_item_id);

        IF v_last_type IS NULL THEN
            RAISE EXCEPTION 'Cannot report loss of item %, not rented', v_item_id USING ERRCODE = 'P1001';
        END IF;

        IF v_last_type <> 'wypożyczenie' THEN
            RAISE EXCEPTION 'Cannot report loss of item %, last event: %', v_item_id, v_last_type USING ERRCODE = 'P1001';
        END IF;

        INSERT INTO events_items ("eventId", "itemId")
        VALUES (v_event_id, v_item_id)
        RETURNING "id" INTO v_event_item_id;

        INSERT INTO loss_details ("id", "description")
        VALUES (v_event_item_id, p_description);

        v_event_item_ids := array_append(v_event_item_ids, v_event_item_id);
    END LOOP;

    event_id := v_event_id;
    event_item_ids := v_event_item_ids;

    RETURN QUERY
    SELECT event_id, event_item_ids;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_return(
    p_user_id INT,
    p_approved_by INT,
    p_item_ids INT[],
    p_status return_details_status_enum,
    p_description TEXT
)
RETURNS TABLE(event_id INT, event_item_ids INT[]) AS $$
DECLARE
    v_event_id INT;
    v_item_id INT;
    v_event_item_id INT;
    v_event_item_ids INT[] := '{}';
    v_last_type TEXT;
BEGIN
    BEGIN
        INSERT INTO events ("type", "userId", "approvedBy")
        VALUES ('zwrot', p_user_id, p_approved_by)
        RETURNING "id" INTO v_event_id;
    EXCEPTION
        WHEN foreign_key_violation THEN
            RAISE EXCEPTION 'User or approver does not exist' USING ERRCODE = 'P1001';
    END;

    IF (SELECT COUNT(*) FROM unnest(p_item_ids) x) <>
       (SELECT COUNT(DISTINCT x) FROM unnest(p_item_ids) x) THEN
        RAISE EXCEPTION 'Item list contains duplicates' USING ERRCODE = 'P1001';
    END IF;

    FOREACH v_item_id IN ARRAY p_item_ids LOOP
        PERFORM 1 FROM items WHERE "id" = v_item_id;
        IF NOT FOUND THEN
            RAISE EXCEPTION 'Item % does not exist', v_item_id USING ERRCODE = 'P1001';
        END IF;

        v_last_type := get_last_event_type(v_item_id);

        IF v_last_type IS NULL THEN
            RAISE EXCEPTION 'Cannot return item %, not rented', v_item_id USING ERRCODE = 'P1001';
        END IF;

        IF v_last_type NOT IN ('wypożyczenie', 'zagubienie') THEN
            RAISE EXCEPTION 'Cannot return item %, last event: %', v_item_id, v_last_type USING ERRCODE = 'P1001';
        END IF;

        INSERT INTO events_items ("eventId", "itemId")
        VALUES (v_event_id, v_item_id)
        RETURNING "id" INTO v_event_item_id;

        INSERT INTO return_details ("id", "status", "description")
        VALUES (v_event_item_id, p_status, p_description);

        v_event_item_ids := array_append(v_event_item_ids, v_event_item_id);
    END LOOP;

    event_id := v_event_id;
    event_item_ids := v_event_item_ids;

    RETURN QUERY
    SELECT event_id, event_item_ids;
END;
$$ LANGUAGE plpgsql;
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
DROP FUNCTION IF EXISTS create_rental(INT, INT, INT[], rental_details_purposetype_enum, TEXT, TIMESTAMP);
DROP FUNCTION IF EXISTS create_loss(INT, INT, INT[], TEXT);
DROP FUNCTION IF EXISTS create_return(INT, INT, INT[], return_details_status_enum, TEXT);
DROP FUNCTION IF EXISTS get_last_event_type(INT);
`);
  }
}
