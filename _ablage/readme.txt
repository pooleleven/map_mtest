CREATE TABLE seiten_inhalte (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titel VARCHAR(255) NOT NULL,
    inhalt TEXT NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL
);

INSERT INTO seiten_inhalte (titel, inhalt, slug) VALUES
('Seite Eins', 'Dies ist der Inhalt von Seite Eins aus der Datenbank.', 'seite1'),
('Seite Zwei', 'Dies ist der Inhalt von Seite Zwei aus der Datenbank.', 'seite2'),
('Seite Drei', 'Dies ist der Inhalt von Seite Drei aus der Datenbank.', 'seite3');