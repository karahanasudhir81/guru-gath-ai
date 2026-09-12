-- Profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  display_name text,
  avatar_url text,
  preferred_language text NOT NULL DEFAULT 'en',
  plan text NOT NULL DEFAULT 'free',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- Agents (built-in + custom)
CREATE TABLE public.agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  specialty text NOT NULL,
  persona text NOT NULL,
  accent text NOT NULL DEFAULT 'saffron',
  is_builtin boolean NOT NULL DEFAULT false,
  owner_id uuid,
  sort_order int NOT NULL DEFAULT 100,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agents TO authenticated;
GRANT ALL ON public.agents TO service_role;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "agents_select" ON public.agents FOR SELECT TO authenticated USING (is_builtin = true OR owner_id = auth.uid());
CREATE POLICY "agents_insert_own" ON public.agents FOR INSERT TO authenticated WITH CHECK (owner_id = auth.uid() AND is_builtin = false);
CREATE POLICY "agents_update_own" ON public.agents FOR UPDATE TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid() AND is_builtin = false);
CREATE POLICY "agents_delete_own" ON public.agents FOR DELETE TO authenticated USING (owner_id = auth.uid());

INSERT INTO public.agents (slug, name, tagline, description, specialty, persona, accent, is_builtin, sort_order) VALUES
('arya', 'Arya', 'General Academic & STEM Tutor', 'A patient, step-by-step problem solver for Mathematics, Physics, Chemistry and Biology from school to university level.', 'STEM', 'You are Arya, a warm and patient Indian academic tutor specialising in STEM subjects (Mathematics, Physics, Chemistry, Biology). Teach step by step: first restate the problem, then reason through it in numbered steps, then give the final answer clearly. Use LaTeX ($...$ inline, $$...$$ display) for all formulas. Ask a short check-for-understanding question at the end. Adapt to CBSE/ICSE/State board and JEE/NEET contexts when relevant. Encourage the student; never shame mistakes.', 'saffron', true, 1),
('bhasha', 'Bhasha Coach', 'Conversational Language & Speech Assistant', 'Your accent, vocabulary and phonetics guide for English, Hindi and regional languages. Practise real conversations with instant feedback.', 'Languages', 'You are Bhasha Coach, a friendly conversational language and speech assistant for Indian learners. Help with English and Indian languages (Hindi, Tamil, Telugu, Bengali, and others). Give phonetic guidance (IPA and simple respelling), correct grammar gently, suggest richer vocabulary, and offer short role-play dialogues. When the student writes in a language, reply in that language plus a short English gloss. Keep responses conversational and encouraging.', 'teal', true, 2),
('saraswati', 'Saraswati', 'Humanities & Exam Prep Guide', 'History, Polity, Geography and Economics for UPSC, State PSC and Board exams — with structured essay feedback and answer-writing practice.', 'Humanities', 'You are Saraswati, an erudite yet approachable humanities mentor and exam-preparation guide for UPSC, State PSC and Board exams. Cover History, Polity, Geography, Economics, Ethics and current affairs. Structure answers the way toppers do: introduction, body with headings and bullet points, conclusion. For essays, provide rubric-based feedback (structure, argument, evidence, language) with a score out of 10 and concrete improvements. Cite constitutional articles, committees and dates precisely.', 'gold', true, 3),
('yukti', 'Yukti', 'Logical Reasoning & Coding Mentor', 'Algorithmic practice, data structures, logic puzzles and interview prep in Python, C++, Java and JavaScript.', 'Reasoning & Coding', 'You are Yukti, a sharp and encouraging logical-reasoning and coding mentor. Help with algorithms, data structures, competitive programming, coding interviews, aptitude and logic puzzles. Prefer guiding questions and hints before revealing full solutions. Explain time and space complexity. Provide clean, commented code in fenced blocks in the student''s chosen language (default Python). Offer one follow-up practice problem at the end.', 'indigo', true, 4);

-- Threads
CREATE TABLE public.threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  agent_id uuid NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'New study session',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX threads_user_updated_idx ON public.threads (user_id, updated_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.threads TO authenticated;
GRANT ALL ON public.threads TO service_role;
ALTER TABLE public.threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "threads_all_own" ON public.threads FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Messages
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES public.threads(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  client_id text,
  role text NOT NULL,
  parts jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX messages_thread_created_idx ON public.messages (thread_id, created_at);
CREATE UNIQUE INDEX messages_thread_client_idx ON public.messages (thread_id, client_id) WHERE client_id IS NOT NULL;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "messages_all_own" ON public.messages FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Notes (session summaries + saved notes)
CREATE TABLE public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  thread_id uuid REFERENCES public.threads(id) ON DELETE SET NULL,
  title text NOT NULL,
  content text NOT NULL,
  kind text NOT NULL DEFAULT 'note',
  subject text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notes TO authenticated;
GRANT ALL ON public.notes TO service_role;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "notes_all_own" ON public.notes FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Recordings (conversation transcripts)
CREATE TABLE public.recordings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  thread_id uuid REFERENCES public.threads(id) ON DELETE SET NULL,
  title text NOT NULL,
  transcript text NOT NULL,
  duration_seconds int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.recordings TO authenticated;
GRANT ALL ON public.recordings TO service_role;
ALTER TABLE public.recordings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "recordings_all_own" ON public.recordings FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Flashcards
CREATE TABLE public.flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject text NOT NULL DEFAULT 'General',
  front text NOT NULL,
  back text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.flashcards TO authenticated;
GRANT ALL ON public.flashcards TO service_role;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "flashcards_all_own" ON public.flashcards FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Subject progress
CREATE TABLE public.subject_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject text NOT NULL,
  mastery int NOT NULL DEFAULT 0,
  sessions int NOT NULL DEFAULT 0,
  minutes int NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, subject)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subject_progress TO authenticated;
GRANT ALL ON public.subject_progress TO service_role;
ALTER TABLE public.subject_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "progress_all_own" ON public.subject_progress FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- Support tickets (public widget)
CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  email text NOT NULL,
  category text NOT NULL DEFAULT 'feedback',
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.support_tickets TO anon;
GRANT SELECT, INSERT ON public.support_tickets TO authenticated;
GRANT ALL ON public.support_tickets TO service_role;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tickets_insert_anon" ON public.support_tickets FOR INSERT TO anon WITH CHECK (user_id IS NULL);
CREATE POLICY "tickets_insert_auth" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() OR user_id IS NULL);
CREATE POLICY "tickets_select_own" ON public.support_tickets FOR SELECT TO authenticated USING (user_id = auth.uid());