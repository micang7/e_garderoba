--
-- PostgreSQL database dump
--

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 17.4

-- Started on 2026-01-27 19:20:48

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
-- TOC entry 3497 (class 0 OID 16466)
-- Dependencies: 226
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "firstName", "lastName", email, phone, "passwordHash", role, "createdAt") FROM stdin;
1	Jan	Kowalski	jkowalski@example.com	123456789	$2b$12$twXTF270S62P/CSxPs7D2OR3HENhFG5T62wroLp5o8HZRGBSdWpKa	administrator	2026-01-27 10:58:56.090264
2	Adam	Nowak	anowak@example.com	723853971	$2b$12$.yzUp8TuQiAV4mSRCkzd.u0qMkY5CW0zBOXy13P98eljYGBreOvAu	kierownik	2026-01-27 10:58:56.090264
3	Piotr	Zieliński	pzielinski@example.com	601234567	$2b$12$JSMtfDF7Bk2ra1ObJYK/GOoxC3kxTeyo/aO54zJQDP8YoIAgJXK/u	kierownik	2026-01-27 10:58:56.090264
4	Mateusz	Woźniak	mwozniak@example.com	\N	$2b$12$N1deyZrIJwuSgA06FELqz.cQr4qR2XwZdcE4f5YyzlLjT8fwmAZwe	kierownik	2026-01-27 10:58:56.090264
5	Łukasz	Jodłowski	ljodlowski@example.com	502345678	$2b$12$xOF4XU0lNamfM1CkgSOYZuJCXk7OAKobMfxTpE0IopIjI6FkBZ.ai	tancerz	2026-01-27 10:58:56.090264
6	Kamil	Lewandowski	klewandowski@example.com	\N	$2b$12$8ejUehzXC8/hQ.OQPYvhRuC3kdrd6ZlDpHKFdZ.gABDFA2yeP7996	tancerz	2026-01-27 10:58:56.090264
7	Michał	Mazur	mmazur@example.com	703456789	$2b$12$6U/vD.OmHxpdy9HoIwv1SOmg5W3zJIM/IxrW1S9JTumaRtLhBlZbm	tancerz	2026-01-27 10:58:56.090264
8	Jakub	Krawczyk	jkrawczyk@example.com	\N	$2b$12$tkuUsMJmz9p5qnzCQaBpU.BsqXdawbwbTtBNpQs6aukjgNlvrhs8e	tancerz	2026-01-27 10:58:56.090264
9	Tomasz	Kaczmarek	tkaczmarek@example.com	804567890	$2b$12$yCkpivd1.KFgoyeUHNaP9OM0aZRh6HSxg4soHRU9ySCKQZSkX/AZC	tancerz	2026-01-27 10:58:56.090264
10	Bartosz	Grabowski	bgrabowski@example.com	\N	$2b$12$PjGvKK2JoEiMn8hTzWgnsemr9bVGCTQGokNtTE.e.Uljq52dge/qW	tancerz	2026-01-27 10:58:56.090264
11	Robert	Szymański	rszymanski@example.com	905678901	$2b$12$VSfCIhMjS5bfaxMHYt9rWOXAQczhhRo7yZsiQVTTEoWT5WZckeDhK	tancerz	2026-01-27 10:58:56.090264
12	Adrian	Dąbrowski	adabrowski@example.com	\N	$2b$12$iZL3oetNDxgM8PFEg7w2SOrMI/z3GtwEJL.G14e0.dxso3NsB0UNy	tancerz	2026-01-27 10:58:56.090264
13	Sebastian	Kozłowski	skozlowski@example.com	512678123	$2b$12$2kmhFCJUxUyC0jy6tFCVZu99APcZQDhwaolrln4soQyTRjIkstaYu	tancerz	2026-01-27 10:58:56.090264
14	Marcin	Jankowski	mjankowski@example.com	\N	$2b$12$U5e7YofTQKYOqyHLmEUavuu5XJXKL2s29vjXYN/liGIp3b8Z6LQv2	tancerz	2026-01-27 10:58:56.090264
15	Anna	Wiśniewska	awisniewska@example.com	603112233	$2b$12$uTHgcIDBNtcL3bHRzjvjhOuiaby3qLlSS4kgvhTuZEwjHefxwbQiK	tancerz	2026-01-27 10:58:56.090264
16	Katarzyna	Wójcik	kwojcik@example.com	\N	$2b$12$gGIkXmghMer5ZV5riBk.WOrmOj3ySZ93u6ynSiltUJaod4MUT8sbK	tancerz	2026-01-27 10:58:56.090264
17	Maria	Kamińska	mkaminska@example.com	704223344	$2b$12$1XHOhaVARCWulBc2Fx5VcOrF61fL.yLILqotRJEKQMHPRmqd8gz.q	tancerz	2026-01-27 10:58:56.090264
18	Małgorzata	Włodarczyk	mwlodarczyk@example.com	\N	$2b$12$uniiWFCHPm4OjM89QM1hWOTPUMk9w1BaRxOvyBgYmEcjWoAHjxcny	tancerz	2026-01-27 10:58:56.090264
19	Agnieszka	Chmielewska	achmielewska@example.com	805334455	$2b$12$ZJLeUJgmPxIzAIdtioEdEOCscMCUjW3GFgj33hUXDnaGlaYj4yM2C	tancerz	2026-01-27 10:58:56.090264
20	Magdalena	Borkowska	mborkowska@example.com	\N	$2b$12$jFd/ObqYg2j9AZO5H2ZD0enYhs9l2hrikVo7eCqVjsV0aCt9S532q	tancerz	2026-01-27 10:58:56.090264
21	Natalia	Szczepańska	nszczepanska@example.com	506445566	$2b$12$PHR/N8egi1J.gu8eOrkIquUQm/6WWiqGC3TfwYZYu7Rq7P66lLr.O	tancerz	2026-01-27 10:58:56.090264
22	Zofia	Lis	zlis@example.com	\N	$2b$12$XXzRdFgcuK2WM/4Njq4bru/Qs0B/nWmGjylkEcVlMg8TASlT8O8Y6	tancerz	2026-01-27 10:58:56.090264
23	Karolina	Duda	kduda@example.com	607556677	$2b$12$HOPv7FxwRMwgK71pFKiSVOHPUYHz.ZZzXzPIOLNiQ18Vnxsy6VEEq	tancerz	2026-01-27 10:58:56.090264
24	Aleksandra	Pietrzak	apietrzak@example.com	\N	$2b$12$O6bER/5ez4xUIwTSV25Pbu2OAnu8GQITc5.mG3ZNf0LdX548IKtJC	tancerz	2026-01-27 10:58:56.090264
\.


--
-- TOC entry 3486 (class 0 OID 16431)
-- Dependencies: 215
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events (id, type, "createdAt", "userId", "approvedBy") FROM stdin;
55	wypożyczenie	2026-01-01 08:00:00	5	1
56	wypożyczenie	2026-01-01 10:00:00	6	2
57	zwrot	2026-01-02 10:00:00	6	2
58	wypożyczenie	2026-01-02 13:00:00	7	3
59	zwrot	2026-01-06 13:00:00	7	3
60	zagubienie	2026-01-06 14:00:00	7	3
61	zwrot	2026-01-08 14:00:00	5	1
62	zwrot	2026-01-08 15:00:00	15	1
63	wypożyczenie	2026-01-09 15:00:00	15	1
64	wypożyczenie	2026-01-10 03:00:00	9	2
65	zwrot	2026-01-11 03:00:00	7	3
66	zwrot	2026-01-13 03:00:00	15	1
67	wypożyczenie	2026-01-13 08:00:00	11	4
68	zwrot	2026-01-16 08:00:00	11	4
69	wypożyczenie	2026-01-17 08:00:00	12	2
70	zwrot	2026-01-19 08:00:00	12	2
71	wypożyczenie	2026-01-20 08:00:00	13	1
72	zwrot	2026-01-21 08:00:00	13	1
73	zwrot	2026-01-21 20:00:00	9	2
74	wypożyczenie	2026-01-22 20:00:00	8	1
\.


--
-- TOC entry 3490 (class 0 OID 16440)
-- Dependencies: 219
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, code, name, size, gender, description, "createdAt") FROM stdin;
1	KRA-M-KAS-1	Kierezja krakowska	klatka: 108 cm / pas: 100 cm / dł. rękawa: 66 cm	męski	Długa sukmana z ciemnego sukna z charakterystycznym, bogato haftowanym kołnierzem.	2026-01-27 10:58:56.105789
2	KRA-D-GOR-1	Gorset krakowski	biust: 92 cm / talia: 76 cm	damski	Czarny, aksamitny gorset wyszywany kolorowymi nicią i cekinami, z naszytymi licznymi tasiemkami.	2026-01-27 10:58:56.105789
3	KRA-M-KAP-1	Krakuska	obwód głowy: 58 cm	męski	Czerwona czapka rogatywka obszyta czarnym barankiem, ozdobiona pawimi piórami i kolorowymi wstążkami.	2026-01-27 10:58:56.105789
4	KRA-D-SPA-1	Zapaska krakowska	szerokość: 80 cm / długość: 65 cm	damski	Biały fartuch z cienkiego płótna, wykończony misternym białym haftem i ząbkami.	2026-01-27 10:58:56.105789
5	ŁOW-D-SUK-1	Pasiak łowicki (kieca)	talia: 78 cm / długość: 75 cm	damski	Ciężka spódnica wykonana z wełny o pionowych, wielokolorowych pasach, z przewagą zieleni i pomarańczu.	2026-01-27 10:58:56.105789
6	ŁOW-M-SPO-1	Spodnie łowickie	pas: 90 cm / długość: 105 cm	męski	Wełniane spodnie w podłużne pasy, w kolorze pomarańczowym.	2026-01-27 10:58:56.105789
7	ŁOW-D-KOS-1	Bielunka łowicka	kołnierzyk: 38 cm / biust: 110 cm	damski	Biała koszula z bufiastymi rękawami, ozdobiona na ramionach i mankietach barwnym haftem płaskim (róże).	2026-01-27 10:58:56.105789
8	POD-M-SPO-1	Portki góralskie	pas: 86 cm / biodra: 100 cm / nogawka: 78 cm	męski	Obcisłe spodnie z białego folowanego sukna, zdobione bogatym haftem (parzenicami) przy przyporach.	2026-01-27 10:58:56.105789
9	POD-M-CUC-1	Cucha podhalańska	klatka: 115 cm / długość: 80 cm	męski	Wierzchnie okrycie z białego sukna, zarzucane na ramiona, spięte metalową klamrą (spinką).	2026-01-27 10:58:56.105789
10	POD-D-KIE-1	Kieca podhalańska	talia: 74 cm / długość: 85 cm	damski	Spódnica najczęściej z tybetu w motywy kwiatowe (róże), u dołu podszyta szczoteczką.	2026-01-27 10:58:56.105789
11	POD-U-KIE-1	Kierpce podhalańskie	długość wkładki: 27 cm	uniwersalny	Skórzane obuwie wykonane z jednego kawałka skóry, wiązane rzemykami (nawłokami).	2026-01-27 10:58:56.105789
12	ŻYW-D-CZE-1	Czepek żywiecki	uniwersalny	damski	Złoty czepek mężatek, bogato haftowany metalową nicią, z tiulowym rąbkiem nad czołem.	2026-01-27 10:58:56.105789
13	ŻYW-D-SZA-1	Szal tiulowy żywiecki	200 cm x 50 cm	damski	Długi, biały szal z delikatnego tiulu, pokryty ręcznym haftem o motywach roślinnych.	2026-01-27 10:58:56.105789
14	KUR-D-CZÓ-1	Czółko kurpiowskie	obwód: 54 cm	damski	Wysokie nakrycie głowy dla panien, wykonane z czarnego aksamitu, ozdobione kwiatami i wstążkami.	2026-01-27 10:58:56.105789
15	KUR-M-KAP-1	Fasownica kurpiowska	obwód głowy: 57 cm	męski	Ciemny kapelusz filcowy o cylindrycznym kształcie, przepasany czerwoną wstążką.	2026-01-27 10:58:56.105789
16	ŚLĄ-D-JAK-1	Jakla rozbarska	biust: 100 cm / talia: 85 cm	damski	Dopasowany kaftan kobiecy, sięgający bioder, z baskinką i stójką, zdobiony aplikacjami.	2026-01-27 10:58:56.105789
17	ŚLĄ-M-BRU-1	Bruclik śląski	klatka: 104 cm / długość: 55 cm	męski	Krótka, dopasowana kamizelka bez rękawów, najczęściej w kolorze niebieskim z metalowymi guzikami.	2026-01-27 10:58:56.105789
18	RZE-M-KOS-1	Koszula rzeszowska	kołnierzyk: 41 cm / klatka: 120 cm	męski	Biała lniana koszula z charakterystycznym czerwonym haftem na kołnierzu i mankietach.	2026-01-27 10:58:56.105789
19	RZE-D-SPA-1	Zapaska rzeszowska	szerokość: 90 cm / długość: 70 cm	damski	Biały fartuch z gęstym, dziurkowanym haftem rzeszowskim na dole.	2026-01-27 10:58:56.105789
20	KAS-D-CZE-1	Złotnica kaszubska	obwód głowy: 56 cm	damski	Aksamitny czepek haftowany złotymi nićmi w motywy owoców granatu i tulipanów.	2026-01-27 10:58:56.105789
21	KAS-M-KAM-1	Liwko kaszubskie	klatka: 106 cm / pas: 98 cm	męski	Długa kamizelka w kolorze ciemnogranatowym, zdobiona haftem kaszubskim.	2026-01-27 10:58:56.105789
22	LUB-D-KOS-1	Koszula krzczonowska	biust: 95 cm / rękaw: 62 cm	damski	Koszula zdobiona pasami haftu krzyżykowego i wielobarwnymi wstążeczkami na rękawach.	2026-01-27 10:58:56.105789
23	LUB-M-PAS-1	Pas skórzany lubelski	długość: 110 cm / szerokość: 10 cm	męski	Szeroki pas ze skóry, zdobiony tłoczeniami i metalowymi kółkami.	2026-01-27 10:58:56.105789
24	BIŁ-D-HAF-1	Surań biłgorajski	długość: 350 cm / szerokość: 45 cm	damski	Długi płat cienkiego płótna owijany wokół głowy, ozdobiony specyficznym spiralnym haftem (łańcuszkiem).	2026-01-27 10:58:56.105789
25	BIŁ-M-SPO-1	Gacie biłgorajskie	pas: 80-100 cm (wiązane) / dł. nogawki: 75 cm	męski	Proste spodnie z grubego lnu, białe, o luźnym kroju, wiązane w pasie sznurkiem.	2026-01-27 10:58:56.105789
26	CIE-D-ŻYW-1	Żywotek cieszyński	pod biustem: 80 cm / ramiączka: 35 cm	damski	Aksamitny, bardzo krótki gorset, bogato haftowany złotymi lub srebrnymi nićmi.	2026-01-27 10:58:56.105789
27	CIE-D-PAS-1	Trzos cieszyński	talia: 82 cm	damski	Srebrny lub pozłacany pas składający się z ogniw, zapinany na ozdobną klamrę.	2026-01-27 10:58:56.105789
28	SZA-M-KAFT-1	Kaftan szamotulski	klatka: 112 cm / pas: 105 cm	męski	Długie okrycie bez rękawów z ciemnego sukna, sięgające kolan, z rzędem guzików.	2026-01-27 10:58:56.105789
29	SZA-D-KRY-1	Kryza szamotulska	szyja: 38 cm	damski	Szeroki, sztywny kołnierz z tiulu, bogato haftowany, okalający szyję.	2026-01-27 10:58:56.105789
30	SIE-D-KIE-1	Wełniak sieradzki	talia: 80 cm / długość: 70 cm	damski	Spódnica w pionowe, wielobarwne paski, marszczona w pasie, o intensywnych kolorach.	2026-01-27 10:58:56.105789
31	OPO-M-LEJ-1	Lejbik opoczyński	klatka: 110 cm / długość: 60 cm	męski	Rodzaj kamizelki z białego sukna z ciemnymi obszyciami i kolorowym haftem na piersiach.	2026-01-27 10:58:56.105789
32	OPO-D-KAP-1	Kapelusz opoczyński	obwód głowy: 55 cm	damski	Słomkowy kapelusz zdobiony polnymi kwiatami i długimi wstążkami spływającymi na plecy.	2026-01-27 10:58:56.105789
33	KUB-D-GOR-1	Wstążkowiec kurpiowski	biust: 90 cm / talia: 75 cm	damski	Gorset zdobiony pionowymi rzędami kolorowych wstążek naszytych jedna obok drugiej.	2026-01-27 10:58:56.105789
34	WAR-D-CZE-1	Czepek warmiński	obwód: 56 cm	damski	Duży czepek o twardym denku, z bogatym złotym haftem i szerokimi bandami (wstęgami).	2026-01-27 10:58:56.105789
35	BAM-D-KOR-1	Kornet bamberski	wysokość: 25 cm / obwód: 54 cm	damski	Bardzo wysokie, ozdobne nakrycie głowy wykonane z setek sztucznych kwiatów i piór.	2026-01-27 10:58:56.105789
36	RAD-M-SPO-1	Spodnie radomskie	pas: 88 cm / nogawka: 80 cm	męski	Białe spodnie płócienne z prostymi nogawkami, wpuszczane w wysokie buty.	2026-01-27 10:58:56.105789
37	UNI-D-KOR-1	Korale prawdziwe	długość sznura: 45 cm	damski	Trzy sznury naturalnego korala o czerwonej barwie, z krzyżem lub medalionem.	2026-01-27 10:58:56.105789
38	UNI-M-BUT-1	Buty z cholewami	rozmiar: 43 / obwód łydki: 40 cm	męski	Skórzane czarne buty, tzw. "oficerki" z twardą cholewą, używane w wielu regionach.	2026-01-27 10:58:56.105789
39	UNI-U-PAS-1	Pas krakowski z brzękadłami	długość: 100 cm	uniwersalny	Szeroki biały pas z otworami, przez które przewleczone są kółka wydające dźwięk podczas tańca.	2026-01-27 10:58:56.105789
40	KRA-D-CHU-1	Chusta czepcowa krakowska	80 cm x 80 cm	damski	Biała chusta wiązana w czepiec, zdobiona białym haftem dziurkowanym.	2026-01-27 10:58:56.105789
41	WIL-M-KOS-1	Koszula wileńska	kołnierzyk: 42 cm / klatka: 115 cm	męski	Koszula z geometrycznym, tkany wzorem (tzw. przebieranie) w kolorach czerwono-czarnych.	2026-01-27 10:58:56.105789
42	ŁOW-D-SPA-1	Zapaska naramienna łowicka	szerokość: 120 cm / długość: 100 cm	damski	Duża, pasiasta chusta wełniana zarzucana na ramiona w chłodne dni.	2026-01-27 10:58:56.105789
43	POD-D-GOR-1	Gorset tybetowy podhalański	biust: 88 cm / talia: 72 cm	damski	Gorset z cienkiej wełny (tybetu), haftowany w kolorowe kwiaty (dziewięćsiły, róże).	2026-01-27 10:58:56.105789
44	ŚLĄ-D-SPA-1	Zopaska śląska	szerokość: 100 cm / długość: 80 cm	damski	Szeroki fartuch z jedwabiu lub adamaszku, często w kolorze kremowym lub błękitnym.	2026-01-27 10:58:56.105789
45	KRA-M-PAS-2	Pas trzos krakowski	długość: 105 cm / szerokość: 12 cm	męski	Szeroki pas skórzany z kieszenią na pieniądze (trzos), zdobiony haftem i tłoczeniami.	2026-01-27 10:58:56.105789
46	KUR-D-FES-1	Fest kurpiowski	talia: 76 cm / długość: 70 cm	damski	Spódnica z ciemnego materiału, ozdobiona u dołu szerokim pasem naszytych wstążek.	2026-01-27 10:58:56.105789
47	LUB-M-KAP-1	Maciejówka lubelska	obwód głowy: 59 cm	męski	Czapka z daszkiem wykonana z granatowego sukna, popularna w stroju krzczonowskim.	2026-01-27 10:58:56.105789
48	RZE-D-KOS-1	Koszula rzeszowska kobieca	biust: 105 cm / kołnierzyk: 36 cm	damski	Koszula z białym haftem dziurkowanym na dużym, wykładanym kołnierzu.	2026-01-27 10:58:56.105789
49	KAS-U-BUT-1	Korki kaszubskie	rozmiar: 38	uniwersalny	Drewniane chodaki ze skórzanym wierzchem, używane do prac gospodarskich i tańców plebejskich.	2026-01-27 10:58:56.105789
50	CIE-D-KOS-1	Kabotek cieszyński	biust: 92 cm / długość: 35 cm	damski	Krótka biała koszulka sięgająca pod biust, z bufiastymi rękawami wykończonymi koronką.	2026-01-27 10:58:56.105789
51	SZA-M-SPO-1	Portki szamotulskie	pas: 92 cm / długość: 102 cm	męski	Ciemnogranatowe spodnie sukienne, noszone do wysokich butów.	2026-01-27 10:58:56.105789
\.


--
-- TOC entry 3488 (class 0 OID 16436)
-- Dependencies: 217
-- Data for Name: events_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.events_items (id, "eventId", "itemId") FROM stdin;
102	55	1
103	55	2
104	55	3
105	55	4
106	56	5
107	56	6
108	56	7
109	57	5
110	57	6
111	57	7
112	58	8
113	58	9
114	58	10
115	58	11
116	59	8
117	59	9
118	59	10
119	60	11
120	61	1
121	61	3
122	62	2
123	62	4
124	63	2
125	64	20
126	64	21
127	65	11
128	66	2
129	67	16
130	67	17
131	68	16
132	68	17
133	69	22
134	69	23
135	70	22
136	70	23
137	71	24
138	71	25
139	72	24
140	72	25
141	73	20
142	73	21
143	74	1
144	74	2
\.


--
-- TOC entry 3492 (class 0 OID 16447)
-- Dependencies: 221
-- Data for Name: loss_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.loss_details (id, description) FROM stdin;
119	Zgubiono podczas pakowania po występie
\.


--
-- TOC entry 3493 (class 0 OID 16450)
-- Dependencies: 222
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1769466743954	Name1769466743954
2	1769465359934	Name1769465359934
3	1769469501374	Name1769469501374
\.


--
-- TOC entry 3495 (class 0 OID 16456)
-- Dependencies: 224
-- Data for Name: rental_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rental_details (id, "purposeType", "purposeDescription", "plannedReturnDate") FROM stdin;
102	występ zespołu	Przygotowania do Wielkiej Gali	2026-01-08 08:00:00
103	występ zespołu	Przygotowania do Wielkiej Gali	2026-01-08 08:00:00
104	występ zespołu	Przygotowania do Wielkiej Gali	2026-01-08 08:00:00
105	występ zespołu	Przygotowania do Wielkiej Gali	2026-01-08 08:00:00
106	sesja zdjęciowa zespołu	Sesja wizerunkowa - plener	2026-01-03 10:00:00
107	sesja zdjęciowa zespołu	Sesja wizerunkowa - plener	2026-01-03 10:00:00
108	sesja zdjęciowa zespołu	Sesja wizerunkowa - plener	2026-01-03 10:00:00
112	występ zespołu	Występ w Zakopanem	2026-01-07 13:00:00
113	występ zespołu	Występ w Zakopanem	2026-01-07 13:00:00
114	występ zespołu	Występ w Zakopanem	2026-01-07 13:00:00
115	występ zespołu	Występ w Zakopanem	2026-01-07 13:00:00
124	naprawa we własnym zakresie	Przekazanie do krawcowej	2026-01-12 15:00:00
125	występ zespołu	Festiwal Kaszubski	2026-01-14 03:00:00
126	występ zespołu	Festiwal Kaszubski	2026-01-14 03:00:00
129	występ zespołu	Koncert w Chorzowie	2026-01-15 08:00:00
130	występ zespołu	Koncert w Chorzowie	2026-01-15 08:00:00
133	sesja zdjęciowa zespołu	Zdjęcia do folderu	2026-01-18 08:00:00
134	sesja zdjęciowa zespołu	Zdjęcia do folderu	2026-01-18 08:00:00
137	inny	Warsztaty dla szkół	2026-01-21 08:00:00
138	inny	Warsztaty dla szkół	2026-01-21 08:00:00
143	występ zespołu	Występ gościnny	2026-01-25 20:00:00
144	występ zespołu	Występ gościnny	2026-01-25 20:00:00
\.


--
-- TOC entry 3496 (class 0 OID 16461)
-- Dependencies: 225
-- Data for Name: return_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.return_details (id, status, description) FROM stdin;
109	bez uszkodzeń	Zwrot po udanej sesji
110	bez uszkodzeń	Zwrot po udanej sesji
111	bez uszkodzeń	Zwrot po udanej sesji
116	bez uszkodzeń	Zwrot kostiumów, brak obuwia w worku
117	bez uszkodzeń	Zwrot kostiumów, brak obuwia w worku
118	bez uszkodzeń	Zwrot kostiumów, brak obuwia w worku
120	bez uszkodzeń	Zwrot po Gali
121	bez uszkodzeń	Zwrot po Gali
122	uszkodzony	Rozpruty bok gorsetu, zapaska OK
123	uszkodzony	Rozpruty bok gorsetu, zapaska OK
127	bez uszkodzeń	Kierpce odnalezione w autokarze pod siedzeniem
128	bez uszkodzeń	Naprawa wykonana profesjonalnie
131	bez uszkodzeń	Zwrot terminowy
132	bez uszkodzeń	Zwrot terminowy
135	bez uszkodzeń	Wszystko w porządku
136	bez uszkodzeń	Wszystko w porządku
139	bez uszkodzeń	Zwrot po warsztatach
140	bez uszkodzeń	Zwrot po warsztatach
141	bez uszkodzeń	Zwrot po festiwalu
142	bez uszkodzeń	Zwrot po festiwalu
\.


--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 216
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_id_seq', 74, true);


--
-- TOC entry 3505 (class 0 OID 0)
-- Dependencies: 218
-- Name: events_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.events_items_id_seq', 144, true);


--
-- TOC entry 3506 (class 0 OID 0)
-- Dependencies: 220
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 51, true);


--
-- TOC entry 3507 (class 0 OID 0)
-- Dependencies: 223
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 3, true);


--
-- TOC entry 3508 (class 0 OID 0)
-- Dependencies: 227
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 24, true);


-- Completed on 2026-01-27 19:20:48

--
-- PostgreSQL database dump complete
--

