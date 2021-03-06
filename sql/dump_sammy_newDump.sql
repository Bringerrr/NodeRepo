toc.dat                                                                                             0000600 0004000 0002000 00000010514 13612046252 0014441 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       )                     x            sammy %   10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)     12.1 (Ubuntu 12.1-1.pgdg18.04+1)     I           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         J           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         K           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         L           1262    16385    sammy    DATABASE     o   CREATE DATABASE sammy WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';
    DROP DATABASE sammy;
                postgres    false         M           0    0    DATABASE sammy    ACL     *   GRANT CONNECT ON DATABASE sammy TO sammy;
                   postgres    false    2892         �            1259    16388    account    TABLE     �   CREATE TABLE public.account (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    email character varying(355) NOT NULL
);
    DROP TABLE public.account;
       public            sammy    false         �            1259    16386    account_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.account_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.account_user_id_seq;
       public          sammy    false    197         N           0    0    account_user_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.account_user_id_seq OWNED BY public.account.user_id;
          public          sammy    false    196         �            1259    16400    films    TABLE     �   CREATE TABLE public.films (
    code character(5) NOT NULL,
    title character varying(40) NOT NULL,
    did integer NOT NULL,
    date_prod date,
    kind character varying(10),
    len interval hour to minute
);
    DROP TABLE public.films;
       public            sammy    false         �
           2604    16410    account user_id    DEFAULT     r   ALTER TABLE ONLY public.account ALTER COLUMN user_id SET DEFAULT nextval('public.account_user_id_seq'::regclass);
 >   ALTER TABLE public.account ALTER COLUMN user_id DROP DEFAULT;
       public          sammy    false    196    197    197         E          0    16388    account 
   TABLE DATA           E   COPY public.account (user_id, username, password, email) FROM stdin;
    public          sammy    false    197       2885.dat F          0    16400    films 
   TABLE DATA           G   COPY public.films (code, title, did, date_prod, kind, len) FROM stdin;
    public          sammy    false    198       2886.dat O           0    0    account_user_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.account_user_id_seq', 21, true);
          public          sammy    false    196         �
           2606    16397    account account_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.account DROP CONSTRAINT account_email_key;
       public            sammy    false    197         �
           2606    16393    account account_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (user_id);
 >   ALTER TABLE ONLY public.account DROP CONSTRAINT account_pkey;
       public            sammy    false    197         �
           2606    16395    account account_username_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_username_key UNIQUE (username);
 F   ALTER TABLE ONLY public.account DROP CONSTRAINT account_username_key;
       public            sammy    false    197         �
           2606    16404    films firstkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.films
    ADD CONSTRAINT firstkey PRIMARY KEY (code);
 8   ALTER TABLE ONLY public.films DROP CONSTRAINT firstkey;
       public            sammy    false    198                                                                                                                                                                                            2885.dat                                                                                            0000600 0004000 0002000 00000000460 13612046252 0014261 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	User	1234	user@hhos.com
5	User2	1234	user@dhhos.com
9	User21	12344	user@dhhosf.com
16	User98	12344	user22@dhhosf.com
17	User99	12344	uswer22@dhhosf.com
18	User29	12344	user29@dhhosf.com
20	User49	12344	user49@dhhosf.com
21	User59	12344	user9@dhhosf.com
29	UserNew19902	133322	user9@dhhodfawsf.com
\.


                                                                                                                                                                                                                2886.dat                                                                                            0000600 0004000 0002000 00000000005 13612046252 0014255 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           restore.sql                                                                                         0000600 0004000 0002000 00000007717 13612046252 0015401 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 12.1 (Ubuntu 12.1-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE sammy;
--
-- Name: sammy; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE sammy WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE sammy OWNER TO postgres;

\connect sammy

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- Name: account; Type: TABLE; Schema: public; Owner: sammy
--

CREATE TABLE public.account (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    email character varying(355) NOT NULL
);


ALTER TABLE public.account OWNER TO sammy;

--
-- Name: account_user_id_seq; Type: SEQUENCE; Schema: public; Owner: sammy
--

CREATE SEQUENCE public.account_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_user_id_seq OWNER TO sammy;

--
-- Name: account_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sammy
--

ALTER SEQUENCE public.account_user_id_seq OWNED BY public.account.user_id;


--
-- Name: films; Type: TABLE; Schema: public; Owner: sammy
--

CREATE TABLE public.films (
    code character(5) NOT NULL,
    title character varying(40) NOT NULL,
    did integer NOT NULL,
    date_prod date,
    kind character varying(10),
    len interval hour to minute
);


ALTER TABLE public.films OWNER TO sammy;

--
-- Name: account user_id; Type: DEFAULT; Schema: public; Owner: sammy
--

ALTER TABLE ONLY public.account ALTER COLUMN user_id SET DEFAULT nextval('public.account_user_id_seq'::regclass);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: sammy
--

COPY public.account (user_id, username, password, email) FROM stdin;
\.
COPY public.account (user_id, username, password, email) FROM '$$PATH$$/2885.dat';

--
-- Data for Name: films; Type: TABLE DATA; Schema: public; Owner: sammy
--

COPY public.films (code, title, did, date_prod, kind, len) FROM stdin;
\.
COPY public.films (code, title, did, date_prod, kind, len) FROM '$$PATH$$/2886.dat';

--
-- Name: account_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: sammy
--

SELECT pg_catalog.setval('public.account_user_id_seq', 21, true);


--
-- Name: account account_email_key; Type: CONSTRAINT; Schema: public; Owner: sammy
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_email_key UNIQUE (email);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: sammy
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (user_id);


--
-- Name: account account_username_key; Type: CONSTRAINT; Schema: public; Owner: sammy
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_username_key UNIQUE (username);


--
-- Name: films firstkey; Type: CONSTRAINT; Schema: public; Owner: sammy
--

ALTER TABLE ONLY public.films
    ADD CONSTRAINT firstkey PRIMARY KEY (code);


--
-- Name: DATABASE sammy; Type: ACL; Schema: -; Owner: postgres
--

GRANT CONNECT ON DATABASE sammy TO sammy;


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 