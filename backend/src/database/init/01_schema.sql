--
-- PostgreSQL database dump
--

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 17.4

-- Started on 2026-01-27 11:59:13

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 883 (class 1247 OID 16462)
-- Name: events_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.events_type_enum AS ENUM (
    'wypożyczenie',
    'zagubienie',
    'zwrot'
);


ALTER TYPE public.events_type_enum OWNER TO postgres;

--
-- TOC entry 859 (class 1247 OID 16400)
-- Name: items_gender_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.items_gender_enum AS ENUM (
    'męski',
    'damski',
    'uniwersalny'
);


ALTER TYPE public.items_gender_enum OWNER TO postgres;

--
-- TOC entry 865 (class 1247 OID 16419)
-- Name: rental_details_purposetype_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.rental_details_purposetype_enum AS ENUM (
    'występ zespołu',
    'sesja zdjęciowa zespołu',
    'naprawa we własnym zakresie',
    'inny'
);


ALTER TYPE public.rental_details_purposetype_enum OWNER TO postgres;

--
-- TOC entry 874 (class 1247 OID 16440)
-- Name: return_details_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.return_details_status_enum AS ENUM (
    'bez uszkodzeń',
    'uszkodzony',
    'zniszczony'
);


ALTER TYPE public.return_details_status_enum OWNER TO postgres;

--
-- TOC entry 889 (class 1247 OID 16478)
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_role_enum AS ENUM (
    'tancerz',
    'kierownik',
    'administrator'
);


ALTER TYPE public.users_role_enum OWNER TO postgres;

--
-- TOC entry 241 (class 1255 OID 16533)
-- Name: create_loss(integer, integer, integer[], text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_loss(p_user_id integer, p_approved_by integer, p_item_ids integer[], p_description text) RETURNS TABLE(event_id integer, event_item_ids integer[])
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.create_loss(p_user_id integer, p_approved_by integer, p_item_ids integer[], p_description text) OWNER TO postgres;

--
-- TOC entry 240 (class 1255 OID 16532)
-- Name: create_rental(integer, integer, integer[], public.rental_details_purposetype_enum, text, timestamp without time zone); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_rental(p_user_id integer, p_approved_by integer, p_item_ids integer[], p_purpose_type public.rental_details_purposetype_enum, p_purpose_description text, p_planned_return_date timestamp without time zone) RETURNS TABLE(event_id integer, event_item_ids integer[])
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.create_rental(p_user_id integer, p_approved_by integer, p_item_ids integer[], p_purpose_type public.rental_details_purposetype_enum, p_purpose_description text, p_planned_return_date timestamp without time zone) OWNER TO postgres;

--
-- TOC entry 242 (class 1255 OID 16534)
-- Name: create_return(integer, integer, integer[], public.return_details_status_enum, text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.create_return(p_user_id integer, p_approved_by integer, p_item_ids integer[], p_status public.return_details_status_enum, p_description text) RETURNS TABLE(event_id integer, event_item_ids integer[])
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.create_return(p_user_id integer, p_approved_by integer, p_item_ids integer[], p_status public.return_details_status_enum, p_description text) OWNER TO postgres;

--
-- TOC entry 228 (class 1255 OID 16531)
-- Name: get_last_event_type(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_last_event_type(p_item_id integer) RETURNS text
    LANGUAGE plpgsql
    AS $$
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
$$;


ALTER FUNCTION public.get_last_event_type(p_item_id integer) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 16470)
-- Name: events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events (
    id integer NOT NULL,
    type public.events_type_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT ('now'::text)::timestamp without time zone NOT NULL,
    "userId" integer NOT NULL,
    "approvedBy" integer NOT NULL
);


ALTER TABLE public.events OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16469)
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO postgres;

--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 224
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- TOC entry 223 (class 1259 OID 16455)
-- Name: events_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.events_items (
    id integer NOT NULL,
    "eventId" integer NOT NULL,
    "itemId" integer NOT NULL
);


ALTER TABLE public.events_items OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16454)
-- Name: events_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.events_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_items_id_seq OWNER TO postgres;

--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 222
-- Name: events_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.events_items_id_seq OWNED BY public.events_items.id;


--
-- TOC entry 218 (class 1259 OID 16408)
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    size character varying(255),
    gender public.items_gender_enum,
    description character varying,
    "createdAt" timestamp without time zone DEFAULT ('now'::text)::timestamp without time zone NOT NULL
);


ALTER TABLE public.items OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16407)
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.items_id_seq OWNER TO postgres;

--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 217
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- TOC entry 220 (class 1259 OID 16434)
-- Name: loss_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loss_details (
    id integer NOT NULL,
    description character varying(500)
);


ALTER TABLE public.loss_details OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16390)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16389)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 215
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 219 (class 1259 OID 16427)
-- Name: rental_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rental_details (
    id integer NOT NULL,
    "purposeType" public.rental_details_purposetype_enum,
    "purposeDescription" character varying(500),
    "plannedReturnDate" timestamp without time zone NOT NULL
);


ALTER TABLE public.rental_details OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16447)
-- Name: return_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.return_details (
    id integer NOT NULL,
    status public.return_details_status_enum,
    description character varying
);


ALTER TABLE public.return_details OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16486)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" character varying(50) NOT NULL,
    "lastName" character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(20),
    "passwordHash" character varying(255) NOT NULL,
    role public.users_role_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT ('now'::text)::timestamp without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16485)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 226
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3322 (class 2604 OID 16473)
-- Name: events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- TOC entry 3321 (class 2604 OID 16458)
-- Name: events_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_items ALTER COLUMN id SET DEFAULT nextval('public.events_items_id_seq'::regclass);


--
-- TOC entry 3319 (class 2604 OID 16411)
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- TOC entry 3318 (class 2604 OID 16393)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3324 (class 2604 OID 16489)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3332 (class 2606 OID 16433)
-- Name: rental_details PK_1d9288690a961dda1480ab07fcd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_details
    ADD CONSTRAINT "PK_1d9288690a961dda1480ab07fcd" PRIMARY KEY (id);


--
-- TOC entry 3336 (class 2606 OID 16453)
-- Name: return_details PK_2482b7c49d910d766a12e6519d5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.return_details
    ADD CONSTRAINT "PK_2482b7c49d910d766a12e6519d5" PRIMARY KEY (id);


--
-- TOC entry 3334 (class 2606 OID 16438)
-- Name: loss_details PK_36f41a7c47cbfb57138c0cdc1f7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loss_details
    ADD CONSTRAINT "PK_36f41a7c47cbfb57138c0cdc1f7" PRIMARY KEY (id);


--
-- TOC entry 3340 (class 2606 OID 16476)
-- Name: events PK_40731c7151fe4be3116e45ddf73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY (id);


--
-- TOC entry 3338 (class 2606 OID 16460)
-- Name: events_items PK_7e0fcefd5a797984f92810a3137; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_items
    ADD CONSTRAINT "PK_7e0fcefd5a797984f92810a3137" PRIMARY KEY (id);


--
-- TOC entry 3327 (class 2606 OID 16397)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 3343 (class 2606 OID 16494)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 3330 (class 2606 OID 16416)
-- Name: items PK_ba5885359424c15ca6b9e79bcf6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY (id);


--
-- TOC entry 3328 (class 1259 OID 16417)
-- Name: IDX_1b0a705ce0dc5430c020a0ec31; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_1b0a705ce0dc5430c020a0ec31" ON public.items USING btree (code);


--
-- TOC entry 3341 (class 1259 OID 16495)
-- Name: IDX_97672ac88f789774dd47f7c8be; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON public.users USING btree (email);


--
-- TOC entry 3349 (class 2606 OID 16565)
-- Name: events FK_00e17e2632c8c2f2981bcecf926; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_00e17e2632c8c2f2981bcecf926" FOREIGN KEY ("approvedBy") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3347 (class 2606 OID 16555)
-- Name: events_items FK_15ce7e3242ef69dc00c38207bc8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_items
    ADD CONSTRAINT "FK_15ce7e3242ef69dc00c38207bc8" FOREIGN KEY ("itemId") REFERENCES public.items(id) ON DELETE CASCADE;


--
-- TOC entry 3344 (class 2606 OID 16535)
-- Name: rental_details FK_1d9288690a961dda1480ab07fcd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_details
    ADD CONSTRAINT "FK_1d9288690a961dda1480ab07fcd" FOREIGN KEY (id) REFERENCES public.events_items(id) ON DELETE CASCADE;


--
-- TOC entry 3346 (class 2606 OID 16545)
-- Name: return_details FK_2482b7c49d910d766a12e6519d5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.return_details
    ADD CONSTRAINT "FK_2482b7c49d910d766a12e6519d5" FOREIGN KEY (id) REFERENCES public.events_items(id) ON DELETE CASCADE;


--
-- TOC entry 3345 (class 2606 OID 16540)
-- Name: loss_details FK_36f41a7c47cbfb57138c0cdc1f7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loss_details
    ADD CONSTRAINT "FK_36f41a7c47cbfb57138c0cdc1f7" FOREIGN KEY (id) REFERENCES public.events_items(id) ON DELETE CASCADE;


--
-- TOC entry 3350 (class 2606 OID 16560)
-- Name: events FK_9929fa8516afa13f87b41abb263; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "FK_9929fa8516afa13f87b41abb263" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3348 (class 2606 OID 16550)
-- Name: events_items FK_c2e7a8c00b6cb93d415812aff2d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.events_items
    ADD CONSTRAINT "FK_c2e7a8c00b6cb93d415812aff2d" FOREIGN KEY ("eventId") REFERENCES public.events(id) ON DELETE CASCADE;


-- Completed on 2026-01-27 11:59:13

--
-- PostgreSQL database dump complete
--

