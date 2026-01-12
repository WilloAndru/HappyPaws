--
-- PostgreSQL database dump
--

\restrict qYmt53qY9mvaINyAShaheHgONYFTchhufa5ri0ZjoHEMquWpZYjGfFYjl80pf25

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: AnimalType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AnimalType" AS ENUM (
    'DOG',
    'CAT',
    'CHICKEN',
    'FISH',
    'HAMSTER',
    'HORSE'
);


ALTER TYPE public."AnimalType" OWNER TO postgres;

--
-- Name: Category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Category" AS ENUM (
    'FOOD',
    'HEALTH',
    'TOYS',
    'HYGIENE',
    'ACCESSORIES',
    'HABITAT'
);


ALTER TYPE public."Category" OWNER TO postgres;

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'PAID',
    'SHIPPED',
    'COMPLETED',
    'CANCELLED'
);


ALTER TYPE public."OrderStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Address" (
    id text NOT NULL,
    "userId" text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Address" OWNER TO postgres;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id integer NOT NULL,
    "userId" text NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING'::public."OrderStatus" NOT NULL,
    total double precision DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrderItem" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL,
    quantity integer NOT NULL,
    price double precision NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO postgres;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."OrderItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."OrderItem_id_seq" OWNER TO postgres;

--
-- Name: OrderItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."OrderItem_id_seq" OWNED BY public."OrderItem".id;


--
-- Name: Order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Order_id_seq" OWNER TO postgres;

--
-- Name: Order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Order_id_seq" OWNED BY public."Order".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    "imageUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    discount numeric(4,2) DEFAULT 0 NOT NULL,
    purchases integer DEFAULT 0 NOT NULL,
    rating double precision DEFAULT 0 NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    "animalType" public."AnimalType" DEFAULT 'CAT'::public."AnimalType" NOT NULL,
    category public."Category" DEFAULT 'FOOD'::public."Category" NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    "firebaseUid" text NOT NULL,
    email text NOT NULL,
    name text,
    image text,
    "customerId" text,
    "paymentMethodId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    cellphone text
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: WishItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."WishItem" (
    id integer NOT NULL,
    "userId" text NOT NULL,
    "productId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."WishItem" OWNER TO postgres;

--
-- Name: WishItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."WishItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."WishItem_id_seq" OWNER TO postgres;

--
-- Name: WishItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."WishItem_id_seq" OWNED BY public."WishItem".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order" ALTER COLUMN id SET DEFAULT nextval('public."Order_id_seq"'::regclass);


--
-- Name: OrderItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem" ALTER COLUMN id SET DEFAULT nextval('public."OrderItem_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: WishItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WishItem" ALTER COLUMN id SET DEFAULT nextval('public."WishItem_id_seq"'::regclass);


--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Address" (id, "userId", address, city, country, "isDefault", "createdAt", "updatedAt", name) FROM stdin;
cmi4on66b0001eepkjeavx66e	cmi4on6680000eepksl5ydhgp	Cra109	Bogota	Colombia	t	2025-11-18 14:42:28.734	2025-11-18 17:12:22.335	Home
cmi4u3h8e0001eemcaidcphzz	cmi4on6680000eepksl5ydhgp	Cra07	Bogota	Colombia	f	2025-11-18 17:15:07.636	2025-11-18 17:15:07.636	Work
cmibrtty40001ee9o4jqgh5cd	cmibrtty20000ee9ojsd1vniw				t	2025-11-23 13:46:01.56	2025-11-23 13:46:01.56	Home
cmin8ehse0001ee1g1zkxsuon	cmin8ehsd0000ee1gdw0wslbb				t	2025-12-01 14:15:27.37	2025-12-01 14:15:27.37	Home
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, "userId", status, total, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, "orderId", "productId", quantity, price, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, description, price, "imageUrl", "createdAt", "updatedAt", discount, purchases, rating, stock, "animalType", category) FROM stdin;
16	Chicken Vitamin Drops	Liquid vitamins to improve hen health and egg quality	7.8	https://res.cloudinary.com/dbvtxris4/image/upload/v1764552389/16_b6ifo6.jpg	2025-11-30 16:47:25.635	2025-12-01 01:26:42.556	0.10	9	4.6	25	CHICKEN	HEALTH
2	Dog chow puppy chicken 100g	Dog Chow is a nutritious dog food made with high-quality ingredients to support your petÔÇÖs energy, strong muscles, and overall health every day.	2.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1761239261/dog-food.avif	2025-10-23 17:08:30.42	2025-11-22 21:23:22.354	0.20	2	3.5	50	DOG	FOOD
3	Chunky 250g	Delicious, tender pieces of turkey made to delight your dog. Enriched with essential nutrients and protein to keep your pet strong, active, and full of energy every day.	4.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1761239668/chunky-delidog-trozos-de-pavo250g-caja-10-und_yu6w8t.jpg	2025-10-23 17:16:19.585	2025-11-22 21:23:22.354	0.20	3	4.6	65	DOG	FOOD
4	Chunky 1.5kg	Complete and balanced nutrition made with real lamb, providing high-quality protein for strong muscles and optimal vitality. Perfect for adult dogs who deserve a tasty and healthy meal every day.	15.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1761239850/chunky-adulto-cordero1-4109743b8feab25fb915880312724362-640-0_ixfjks.jpg	2025-10-23 17:18:59.398	2025-11-22 21:23:22.354	0.20	0	3.9	30	DOG	FOOD
5	Whiskas 85g	Soft and tasty food specially formulated for growing kittens. Made with chicken and essential nutrients to support healthy growth, strong bones, and a shiny coat.	3.49	https://res.cloudinary.com/dbvtxris4/image/upload/v1761239974/7896029046623_800x_yapnns.webp	2025-10-23 17:20:56.906	2025-11-22 21:23:22.354	0.10	10	4.8	60	CAT	FOOD
6	Hamster food 1kg	A balanced blend of seeds, grains, and natural ingredients specially formulated for hamsters. Provides essential vitamins, minerals, and energy to support healthy growth, shiny fur, and an active lifestyle.	6.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1761241275/public_bvfsjj.jpg	2025-10-23 17:43:58.793	2025-11-22 21:23:22.354	0.10	3	4.1	50	HAMSTER	FOOD
7	Horse food 40kg	High-quality blend of grains, fibers, and essential nutrients designed to support strong muscles, healthy digestion, and lasting energy. Ideal for maintaining your horseÔÇÖs vitality, performance, and overall well-being.	49.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1761241496/images_mnqyuj.jpg	2025-10-23 17:48:18.552	2025-11-22 21:23:22.354	0.30	4	3.8	10	HORSE	FOOD
8	Chicken food 40kg	Complete and balanced food made with quality grains and proteins to promote healthy growth, strong eggshells, and vibrant feathers. Perfect for keeping your chickens active and productive every day.	45.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1761241844/images_1_nfn931.jpg	2025-10-23 17:52:18.422	2025-11-22 21:23:22.354	0.40	3	4.7	15	CHICKEN	FOOD
9	Tropical Fish Food 30g	High-quality flakes and nutrients formulated to enhance color, vitality, and immune health in all types of aquarium fish. Helps maintain clean water and supports balanced, daily nutrition.	1.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1761242010/Alimento-Aqua-Plus-Hojuela-Peces-Tropicales-30gr-1-75841_ui3rtz.webp	2025-10-23 17:54:57.441	2025-11-22 21:23:22.354	0.10	7	4.4	50	FISH	FOOD
10	BR for Cat 1kg	Premium cat food crafted with salmon flavor for adult cats. Delivers high-quality protein (30%) and essential nutrients to support strong muscles, optimal vitality, and a lustrous coat. Perfect for pet parents looking for a delicious and balanced daily meal.	12.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1761242182/concentrado-gato-br-for-cat-pure-adulto-salmon-1-kg-1_mwlm73.webp	2025-10-23 17:58:01.64	2025-11-22 21:23:22.354	0.40	8	4.6	30	CAT	FOOD
17	Aquarium Filter	Silent water filter for clean aquariums	34.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1764552451/17_zj1na3.webp	2025-11-30 16:47:25.635	2025-12-01 01:27:53.745	0.30	5	4.4	10	FISH	HABITAT
18	Fish Health Drops	Water treatment drops for healthier fish	6.5	https://res.cloudinary.com/dbvtxris4/image/upload/v1764552627/18_w9jsm0.jpg	2025-11-30 16:47:25.635	2025-12-01 01:33:17.236	0.60	20	4.3	50	FISH	HEALTH
19	Hamster Wheel	Silent spinning wheel for hamsters	11.25	https://res.cloudinary.com/dbvtxris4/image/upload/v1764552679/19_io7qlx.jpg	2025-11-30 16:47:25.635	2025-12-01 01:33:17.236	0.25	18	4.7	34	HAMSTER	TOYS
20	Hamster Cage	Spacious cage with tubes and accessories included	49.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1764552781/20_ixrcy2.jpg	2025-11-30 16:47:25.635	2025-12-01 01:33:17.236	0.40	10	4.5	20	HAMSTER	HABITAT
1	Mirringo 1kg	Premium dry cat food made with chicken and rice. Provides essential nutrients for adult cats.	12.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1761067434/cat-food-1_f4u4vq.jpg	2025-10-21 16:49:42.4	2025-11-30 17:11:11.974	0.30	1	4.5	20	CAT	FOOD
12	Cat Litter Box	Easy-clean litter box for indoor cats	18.5	https://res.cloudinary.com/dbvtxris4/image/upload/v1764522910/12_h28nxh.webp	2025-11-30 16:47:25.635	2025-11-30 17:15:26.445	0.50	17	4.4	50	CAT	HYGIENE
13	Dog Leash	Strong nylon leash for daily walks	14.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1764552132/13_ek6rnz.webp	2025-11-30 16:47:25.635	2025-12-01 01:25:04.79	0.15	19	4.3	40	DOG	ACCESSORIES
14	Dog Shampoo	Gentle shampoo for sensitive dog skin	9.75	https://res.cloudinary.com/dbvtxris4/image/upload/v1764552225/14_t3q4t8.webp	2025-11-30 16:47:25.635	2025-12-01 01:25:04.79	0.10	26	4.5	45	DOG	HYGIENE
15	Chicken Feeder	Hanging feeder for chickens and hens	22.4	https://res.cloudinary.com/dbvtxris4/image/upload/v1764552288/15_gfd1nw.jpg	2025-11-30 16:47:25.635	2025-12-01 01:25:04.79	0.20	12	4.2	18	CHICKEN	HABITAT
11	Cat Scratching Post	Durable scratching post to keep your cat's claws healthy	29.99	https://res.cloudinary.com/dbvtxris4/image/upload/v1764522840/11_vwkvi2.jpg	2025-11-30 16:47:25.635	2025-11-30 17:14:18.571	0.10	23	4.6	60	CAT	ACCESSORIES
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, "firebaseUid", email, name, image, "customerId", "paymentMethodId", "createdAt", "updatedAt", cellphone) FROM stdin;
cmi4on6680000eepksl5ydhgp	dekD7mT7XjbHvuZvkQTl3VVq3lg1	wilsonandrescriollo@gmail.com	Wilson Andres Criollo Rodriguez	https://lh3.googleusercontent.com/a/ACg8ocINkQfMrjasVQsPg_M8Qyamm4adJp3jRnDpVkHyG-ot2UaCyT4U=s96-c	\N	\N	2025-11-18 14:42:28.734	2025-11-18 17:14:32.19	3025170000
cmibrtty20000ee9ojsd1vniw	Ssa81geWzbNUOKSJIgz8apEzQx93	andresdino2011@gmail.com	Willo	https://lh3.googleusercontent.com/a/ACg8ocJeB0vx9NQ40iGrPNl8C7YAaRXDTggEVfAuJ024Q5eDDZ6wLE6G=s96-c	\N	\N	2025-11-23 13:46:01.56	2025-11-23 13:46:01.56	
cmin8ehsd0000ee1gdw0wslbb	DICSAHZgSnNsWOzWcDJPoVRIyz53	wcriollo@unal.edu.co	Wilson Andres Criollo Rodriguez	https://lh3.googleusercontent.com/a/ACg8ocLafBoDaglGdn3HqG1i4sZGrmnSaMAq9Pclw5kmRPXuSsltWg=s96-c	\N	\N	2025-12-01 14:15:27.37	2025-12-01 14:15:27.37	
\.


--
-- Data for Name: WishItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."WishItem" (id, "userId", "productId", "createdAt", "updatedAt") FROM stdin;
19	cmi4on6680000eepksl5ydhgp	3	2025-11-25 17:04:33.353	2025-11-25 17:04:33.353
21	cmi4on6680000eepksl5ydhgp	5	2025-11-26 13:43:02.959	2025-11-26 13:43:02.959
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
b26bd2c4-2fa9-487e-bbcf-341fd6417213	0c9ad546f7977f001a9e9b48c3bfbc6100d831db6916e5e655efe98b33de4fca	2025-11-09 15:10:09.488912-05	20251020142543_init	\N	\N	2025-11-09 15:10:09.478212-05	1
d7c5200e-8755-4b85-b753-077bfdd96bde	b68ce5b585427b6136755a5996d150511a1a29c9364a6b750f1e27967f545988	2025-11-09 15:10:09.502559-05	20251020144534_add_product_model	\N	\N	2025-11-09 15:10:09.489746-05	1
c4dce7ba-5a6e-4227-99aa-b2c09af47513	a9ca4f2163537374851661fbb697289a60294dc182b00279bd83fce307c63c19	2025-11-09 15:10:09.510058-05	20251021175313_full_update_products	\N	\N	2025-11-09 15:10:09.503259-05	1
af884a32-d0c1-4d1b-bb33-f1f9f2f1d1c3	2ce50e67b4781246f3bc4f2541252d5df1f3b102e017caa04c1a2dc1499ad016	2025-11-09 15:10:29.937804-05	20251109201029_1	\N	\N	2025-11-09 15:10:29.916357-05	1
279dbf7c-a655-4089-a7a5-56d76bc60612	0c9ad546f7977f001a9e9b48c3bfbc6100d831db6916e5e655efe98b33de4fca	2025-10-20 10:35:20.772755-05	20251020142543_init	\N	\N	2025-10-20 10:35:20.754395-05	1
cd768a3e-4a32-46d9-bf3f-60304b133585	b68ce5b585427b6136755a5996d150511a1a29c9364a6b750f1e27967f545988	2025-10-20 10:35:20.786615-05	20251020144534_add_product_model	\N	\N	2025-10-20 10:35:20.773678-05	1
8213116b-f1d1-4270-9a53-91aa80812ced	a9ca4f2163537374851661fbb697289a60294dc182b00279bd83fce307c63c19	2025-10-21 12:53:13.730414-05	20251021175313_full_update_products	\N	\N	2025-10-21 12:53:13.707848-05	1
ea2de092-b050-471e-a415-5e2d698ef1d9	e885c1db9a890de98b08c7fb4596de258a9742a0d1662c84a8d3e4b482d57597	2025-11-15 10:19:53.957631-05	20251115151953_actualizacion_modelos	\N	\N	2025-11-15 10:19:53.930862-05	1
9021bdf5-de79-4fda-acb1-23830ccf9eb1	5df193b0454c9b776de1ccedc45fd19134b5779f54c892bcbbd5ad83cdb78548	2025-11-15 11:28:09.917084-05	20251115162809_actualizacion_modelos	\N	\N	2025-11-15 11:28:09.911312-05	1
ffa5c350-83f8-4b17-801c-7349eff2da6d	a8505c109dad1327fea6bef518ecaffc4ae3704bb3793820246c86c2648a4fd8	2025-11-17 10:04:24.095165-05	20251117150424_orders	\N	\N	2025-11-17 10:04:24.059067-05	1
acb31c14-2f29-449c-a987-81df352e5a56	b22a5c28e87775fba067c3344acff9fa4513a71e88687028742a1a10cfa601b7	2025-11-18 07:28:49.025497-05	20251118122848_whislist	\N	\N	2025-11-18 07:28:48.981271-05	1
bf4e739e-d5d4-4f30-b647-d9911365b9b7	403c1ad11f510ef61c872b314f131668a548e9265ef1adf6c7c8478d2ab1ae57	2025-11-18 08:10:54.509311-05	20251118131054_whislist	\N	\N	2025-11-18 08:10:54.470683-05	1
\.


--
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 1, false);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Order_id_seq"', 1, false);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 20, true);


--
-- Name: WishItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."WishItem_id_seq"', 21, true);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: WishItem WishItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WishItem"
    ADD CONSTRAINT "WishItem_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_firebaseUid_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_firebaseUid_key" ON public."User" USING btree ("firebaseUid");


--
-- Name: WishItem_userId_productId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "WishItem_userId_productId_key" ON public."WishItem" USING btree ("userId", "productId");


--
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrderItem OrderItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: WishItem WishItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WishItem"
    ADD CONSTRAINT "WishItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: WishItem WishItem_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."WishItem"
    ADD CONSTRAINT "WishItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict qYmt53qY9mvaINyAShaheHgONYFTchhufa5ri0ZjoHEMquWpZYjGfFYjl80pf25

