CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title) values ('Nick Summers', 'https://blog.1password.com/how-to-stay-inspired-working-from-home/', 'How to stay creatively inspired while working from home');
INSERT INTO blogs (author, url, title) values ('Suvi Tuppurainen', 'https://www.nordnet.fi/blogi/rahastokatsaus-12-2021/', 'Megatrendejä ja pienyhtiöitä - nämä olivat rahastosuosikit vuonna 2021');