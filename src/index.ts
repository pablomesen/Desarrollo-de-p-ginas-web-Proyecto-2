import express, { Request, Response } from 'express';
import movieRoutes from './routes/movieRoutes';
import actorRoutes from './routes/actorRoutes';
import userRoutes from './routes/userRoutes';
import { connectDB } from './db';

const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Conexión a la base de datos
connectDB();

// Routes inclusion
app.use('/api', userRoutes);
app.use('/api', movieRoutes);
app.use('/api', actorRoutes);

// API root directory
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World');
});

// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const moviesData = [
    {
      "title": "The Shawshank Redemption",
      "description": "A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
      "director": "Frank Darabont",
      "cast": [
        "Tim Robbins",
        "Morgan Freeman",
        "Bob Gunton"
      ],
      "genres": [
        "Drama"
      ],
      "calification": 9.3,
      "releaseDate": "1994-10-14",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Godfather",
      "description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      "director": "Francis Ford Coppola",
      "cast": [
        "Marlon Brando",
        "Al Pacino",
        "James Caan"
      ],
      "genres": [
        "Crime",
        "Drama"
      ],
      "calification": 9.2,
      "releaseDate": "1972-03-24",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BYTJkNGQyZDgtZDQ0NC00MDM0LWEzZWQtYzUzZDEwMDljZWNjXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Dark Knight",
      "description": "When a menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman, James Gordon and Harvey Dent must work together to put an end to the madness.",
      "director": "Christopher Nolan",
      "cast": [
        "Christian Bale",
        "Heath Ledger",
        "Aaron Eckhart"
      ],
      "genres": [
        "Action",
        "Crime",
        "Drama"
      ],
      "calification": 9,
      "releaseDate": "2008-07-18",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
      ]
    },
    {
      "title": "The Godfather Part II",
      "description": "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
      "director": "Francis Ford Coppola",
      "cast": [
        "Al Pacino",
        "Robert De Niro",
        "Robert Duvall"
      ],
      "genres": [
        "Crime",
        "Drama"
      ],
      "calification": 9,
      "releaseDate": "1974-12-18",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BNzc1OWY5MjktZDllMi00ZDEzLWEwMGItYjk1YmRhYjBjNTVlXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "12 Angry Men",
      "description": "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
      "director": "Sidney Lumet",
      "cast": [
        "Henry Fonda",
        "Lee J. Cobb",
        "Martin Balsam"
      ],
      "genres": [
        "Crime",
        "Drama"
      ],
      "calification": 9,
      "releaseDate": "1957-04-10",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BYjE4NzdmOTYtYjc5Yi00YzBiLWEzNDEtNTgxZGQ2MWVkN2NiXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Lord of the Rings: The Return of the King",
      "description": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
      "director": "Peter Jackson",
      "cast": [
        "Elijah Wood",
        "Viggo Mortensen",
        "Ian McKellen"
      ],
      "genres": [
        "Adventure",
        "Drama",
        "Fantasy"
      ],
      "calification": 9,
      "releaseDate": "2003-12-17",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMTZkMjBjNWMtZGI5OC00MGU0LTk4ZTItODg2NWM3NTVmNWQ4XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Schindler's List",
      "description": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
      "director": "Steven Spielberg",
      "cast": [
        "Liam Neeson",
        "Ralph Fiennes",
        "Ben Kingsley"
      ],
      "genres": [
        "Biography",
        "Drama",
        "History"
      ],
      "calification": 9,
      "releaseDate": "1994-02-04",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BNjM1ZDQxYWUtMzQyZS00MTE1LWJmZGYtNGUyNTdlYjM3ZmVmXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Pulp Fiction",
      "description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      "director": "Quentin Tarantino",
      "cast": [
        "John Travolta",
        "Uma Thurman",
        "Samuel L. Jackson"
      ],
      "genres": [
        "Crime",
        "Drama"
      ],
      "calification": 8.9,
      "releaseDate": "1994-10-14",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Lord of the Rings: The Fellowship of the Ring",
      "description": "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
      "director": "Peter Jackson",
      "cast": [
        "Elijah Wood",
        "Ian McKellen",
        "Orlando Bloom"
      ],
      "genres": [
        "Adventure",
        "Drama",
        "Fantasy"
      ],
      "calification": 8.9,
      "releaseDate": "2001-12-19",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Good, the Bad and the Ugly",
      "description": "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
      "director": "Sergio Leone",
      "cast": [
        "Clint Eastwood",
        "Eli Wallach",
        "Lee Van Cleef"
      ],
      "genres": [
        "Adventure",
        "Drama",
        "Western"
      ],
      "calification": 8.8,
      "releaseDate": "1967-12-29",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMWM5ZjQxM2YtNDlmYi00ZDNhLWI4MWUtN2VkYjBlMTY1ZTkwXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Forrest Gump",
      "description": "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
      "director": "Robert Zemeckis",
      "cast": [
        "Tom Hanks",
        "Robin Wright",
        "Gary Sinise"
      ],
      "genres": [
        "Drama",
        "Romance"
      ],
      "calification": 8.8,
      "releaseDate": "1994-07-06",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Lord of the Rings: The Two Towers",
      "description": "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
      "director": "Peter Jackson",
      "cast": [
        "Elijah Wood",
        "Ian McKellen",
        "Viggo Mortensen"
      ],
      "genres": [
        "Adventure",
        "Drama",
        "Fantasy"
      ],
      "calification": 8.8,
      "releaseDate": "2002-12-18",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMGQxMDdiOWUtYjc1Ni00YzM1LWE2NjMtZTg3Y2JkMjEzMTJjXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Fight Club",
      "description": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
      "director": "David Fincher",
      "cast": [
        "Brad Pitt",
        "Edward Norton",
        "Helena Bonham Carter"
      ],
      "genres": [
        "Drama"
      ],
      "calification": 8.8,
      "releaseDate": "1999-10-15",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Inception",
      "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
      "director": "Christopher Nolan",
      "cast": [
        "Leonardo DiCaprio",
        "Joseph Gordon-Levitt",
        "Elliot Page"
      ],
      "genres": [
        "Action",
        "Adventure",
        "Sci-Fi"
      ],
      "calification": 8.8,
      "releaseDate": "2010-07-16",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
      ]
    },
    {
      "title": "Star Wars: Episode V - The Empire Strikes Back",
      "description": "After the Empire overpowers the Rebel Alliance, Luke Skywalker begins his Jedi training with Yoda. At the same time, Darth Vader and bounty hunter Boba Fett pursue his friends across the galaxy.",
      "director": "Irvin Kershner",
      "cast": [
        "Mark Hamill",
        "Harrison Ford",
        "Carrie Fisher"
      ],
      "genres": [
        "Action",
        "Adventure",
        "Fantasy"
      ],
      "calification": 8.7,
      "releaseDate": "1980-06-18",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMTkxNGFlNDktZmJkNC00MDdhLTg0MTEtZjZiYWI3MGE5NWIwXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Matrix",
      "description": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
      "director": "Lana Wachowski, Lilly Wachowski",
      "cast": [
        "Keanu Reeves",
        "Laurence Fishburne",
        "Carrie-Anne Moss"
      ],
      "genres": [
        "Action",
        "Sci-Fi"
      ],
      "calification": 8.7,
      "releaseDate": "1999-03-31",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Goodfellas",
      "description": "The story of Henry Hill and his life in the mafia, covering his relationship with his wife Karen and his mob partners Jimmy Conway and Tommy DeVito.",
      "director": "Martin Scorsese",
      "cast": [
        "Robert De Niro",
        "Ray Liotta",
        "Joe Pesci"
      ],
      "genres": [
        "Biography",
        "Crime",
        "Drama"
      ],
      "calification": 8.7,
      "releaseDate": "1990-09-21",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BN2E5NzI2ZGMtY2VjNi00YTRjLWI1MDUtZGY5OWU1MWJjZjRjXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "One Flew Over the Cuckoo's Nest",
      "description": "In the Fall of 1963, a Korean War veteran and criminal pleads insanity and is admitted to a mental institution, where he rallies up the scared patients against the tyrannical nurse.",
      "director": "Milos Forman",
      "cast": [
        "Jack Nicholson",
        "Louise Fletcher",
        "Danny DeVito"
      ],
      "genres": [
        "Drama"
      ],
      "calification": 8.7,
      "releaseDate": "1975-11-19",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BYjBkMjgzMzYtNzRiMS00NDc3LWE4YTUtZjYxYjZhNjNhYzhhXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Interstellar",
      "description": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
      "director": "Christopher Nolan",
      "cast": [
        "Matthew McConaughey",
        "Anne Hathaway",
        "Jessica Chastain"
      ],
      "genres": [
        "Adventure",
        "Drama",
        "Sci-Fi"
      ],
      "calification": 8.7,
      "releaseDate": "2014-11-07",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Se7en",
      "description": "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
      "director": "David Fincher",
      "cast": [
        "Brad Pitt",
        "Morgan Freeman",
        "Gwyneth Paltrow"
      ],
      "genres": [
        "Crime",
        "Drama",
        "Mystery"
      ],
      "calification": 8.6,
      "releaseDate": "1995-09-22",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BY2IzNzMxZjctZjUxZi00YzAxLTk3ZjMtODFjODdhMDU5NDM1XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "It's a Wonderful Life",
      "description": "An angel is sent from Heaven to help a desperately frustrated businessman by showing him what life would have been like if he had never existed.",
      "director": "Frank Capra",
      "cast": [
        "James Stewart",
        "Donna Reed",
        "Lionel Barrymore"
      ],
      "genres": [
        "Drama",
        "Family",
        "Fantasy"
      ],
      "calification": 8.6,
      "releaseDate": "1947-01-07",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMDM4OWFhYjEtNTE5Yy00NjcyLTg5N2UtZDQwNDZlYjlmNDU5XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Seven Samurai",
      "description": "Farmers from a village exploited by bandits hire a veteran samurai for protection, and he gathers six other samurai to join him.",
      "director": "Akira Kurosawa",
      "cast": [
        "Toshirô Mifune",
        "Takashi Shimura",
        "Keiko Tsushima"
      ],
      "genres": [
        "Action",
        "Drama"
      ],
      "calification": 8.6,
      "releaseDate": "1956-11-19",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BZjliMWExOTMtZDQ3ZS00NWU3LWIyN2EtMjllNzk3ZTNlYzg4XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Silence of the Lambs",
      "description": "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
      "director": "Jonathan Demme",
      "cast": [
        "Jodie Foster",
        "Anthony Hopkins",
        "Scott Glenn"
      ],
      "genres": [
        "Crime",
        "Drama",
        "Thriller"
      ],
      "calification": 8.6,
      "releaseDate": "1991-02-14",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BNDdhOGJhYzctYzYwZC00YmI2LWI0MjctYjg4ODdlMDExYjBlXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Saving Private Ryan",
      "description": "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
      "director": "Steven Spielberg",
      "cast": [
        "Tom Hanks",
        "Matt Damon",
        "Tom Sizemore"
      ],
      "genres": [
        "Drama",
        "War"
      ],
      "calification": 8.6,
      "releaseDate": "1998-07-24",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BZGZhZGQ1ZWUtZTZjYS00MDJhLWFkYjctN2ZlYjE5NWYwZDM2XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "City of God",
      "description": "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin.",
      "director": "Fernando Meirelles",
      "cast": [
        "Alexandre Rodrigues",
        "Leandro Firmino",
        "Phellipe Haagensen"
      ],
      "genres": [
        "Crime",
        "Drama"
      ],
      "calification": 8.6,
      "releaseDate": "2004-02-13",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BYjY4NGI5OTUtY2ZlZS00Zjk4LTk5N2MtN2JmYWVjNGNmMGRlXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Green Mile",
      "description": "Paul Edgecomb, the head guard of a prison, meets an inmate, John Coffey, a black man who is accused of murdering two girls. His life changes drastically when he discovers that John has a special gift.",
      "director": "Frank Darabont",
      "cast": [
        "Tom Hanks",
        "Michael Clarke Duncan",
        "David Morse"
      ],
      "genres": [
        "Crime",
        "Drama",
        "Fantasy"
      ],
      "calification": 8.6,
      "releaseDate": "1999-12-10",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_.jpg"
      ]
    },
    {
      "title": "Life Is Beautiful",
      "description": "When an open-minded Jewish waiter and his son become victims of the Holocaust, he uses a perfect mixture of will, humor and imagination to protect his son from the dangers around their camp.",
      "director": "Roberto Benigni",
      "cast": [
        "Roberto Benigni",
        "Nicoletta Braschi",
        "Giorgio Cantarini"
      ],
      "genres": [
        "Comedy",
        "Drama",
        "Romance"
      ],
      "calification": 8.6,
      "releaseDate": "1997-12-20",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BZTBhOGYzZjQtYzE0Mi00MGIwLWE0MWYtNzMxNTM2OTFkM2NjXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Terminator 2: Judgment Day",
      "description": "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten year old son John from an even more advanced and powerful cyborg.",
      "director": "James Cameron",
      "cast": [
        "Arnold Schwarzenegger",
        "Linda Hamilton",
        "Edward Furlong"
      ],
      "genres": [
        "Action",
        "Adventure",
        "Sci-Fi"
      ],
      "calification": 8.6,
      "releaseDate": "1991-07-03",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BNGMyMGNkMDUtMjc2Ni00NWFlLTgyODEtZTY2MzBiZTg0OWZiXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Star Wars: Episode IV - A New Hope",
      "description": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
      "director": "George Lucas",
      "cast": [
        "Mark Hamill",
        "Harrison Ford",
        "Carrie Fisher"
      ],
      "genres": [
        "Action",
        "Adventure",
        "Fantasy"
      ],
      "calification": 8.6,
      "releaseDate": "1977-05-25",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BOGUwMDk0Y2MtNjBlNi00NmRiLTk2MWYtMGMyMDlhYmI4ZDBjXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Back to the Future",
      "description": "Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
      "director": "Robert Zemeckis",
      "cast": [
        "Michael J. Fox",
        "Christopher Lloyd",
        "Lea Thompson"
      ],
      "genres": [
        "Adventure",
        "Comedy",
        "Sci-Fi"
      ],
      "calification": 8.5,
      "releaseDate": "1985-07-03",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BZmM3ZjE0NzctNjBiOC00MDZmLTgzMTUtNGVlOWFlOTNiZDJiXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      title: "Spirited Away",
      description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, and where humans are changed into beasts.",
      director: "Hayao Miyazaki",
      cast: [
        "Rumi Hiiragi",
        "Miyu Irino",
        "Mari Natsuki"
      ],
      genres: [
        "Adventure",
        "Animation",
        "Family"
      ],
      calification: 8.6,
      releaseDate: "2003-03-28",
      images: [
        "https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      title: "The Pianist",
      description: "During WWII, acclaimed Polish musician Wladyslaw faces various struggles as he loses contact with his family. As the situation worsens, he hides in the ruins of Warsaw in order to survive.",
      director: "Roman Polanski",
      cast: [
        "Adrien Brody",
        "Thomas Kretschmann",
        "Frank Finlay"
      ],
      genres: [
        "Biography",
        "Drama",
        "Music"
      ],
      calification: 8.5,
      releaseDate: "2003-03-28",
      images: [
        "https://m.media-amazon.com/images/M/MV5BMjEwNmEwYjgtNTk3ZC00NjljLTg5ZDctZTY3ZGQwZjRkZmQxXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      title: "Gladiator",
      description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      director: "Ridley Scott",
      cast: [
        "Russell Crowe",
        "Joaquin Phoenix",
        "Connie Nielsen"
      ],
      genres: [
        "Action",
        "Adventure",
        "Drama"
      ],
      calification: 8.5,
      releaseDate: "2000-05-05",
      images: [
        "https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjEtOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      title: "Parasite",
      description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      director: "Bong Joon Ho",
      cast: [
        "Song Kang-ho",
        "Lee Sun-kyun",
        "Cho Yeo-jeong"
      ],
      genres: [
        "Drama",
        "Thriller"
      ],
      calification: 8.5,
      releaseDate: "2019-11-08",
      images: [
        "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      title: "Psycho",
      description: "A secretary on the run for embezzlement takes refuge at a secluded California motel owned by a repressed man and his overbearing mother.",
      director: "Alfred Hitchcock",
      cast: [
        "Anthony Perkins",
        "Janet Leigh",
        "Vera Miles"
      ],
      genres: [
        "Horror",
        "Mystery",
        "Thriller"
      ],
      calification: 8.5,
      releaseDate: "1960-09-08",
      images: [
        "https://m.media-amazon.com/images/M/MV5BYjZhMzFiZjItODA3ZC00MmRhLWIzMGYtMmVjOWUwYTA3MTRjXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      title: "The Lion King",
      description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
      director: "Roger Allers, Rob Minkoff",
      cast: [
        "Matthew Broderick",
        "Jeremy Irons",
        "James Earl Jones"
      ],
      genres: [
        "Adventure",
        "Animation",
        "Drama"
      ],
      calification: 8.5,
      releaseDate: "1994-06-24",
      images: [
        "https://m.media-amazon.com/images/M/MV5BZGRiZDZhZjItM2M3ZC00Y2IyLTk3Y2MtMWY5YjliNDFkZTJlXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      title: "Grave of the Fireflies",
      description: "A young boy and his little sister struggle to survive in Japan during World War II.",
      director: "Isao Takahata",
      cast: [
        "Tsutomu Tatsumi",
        "Ayano Shiraishi",
        "Akemi Yamaguchi"
      ],
      genres: [
        "Animation",
        "Drama",
        "War"
      ],
      calification: 8.5,
      releaseDate: "1989-07-26",
      images: [
        "https://m.media-amazon.com/images/M/MV5BNTY5MmE2OGMtN2IxNC00MDY4LTkwMGEtZDUzOTYyNWE0ZTNjXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      title: "The Departed",
      description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
      director: "Martin Scorsese",
      cast: [
        "Leonardo DiCaprio",
        "Matt Damon",
        "Jack Nicholson"
      ],
      genres: [
        "Crime",
        "Drama",
        "Thriller"
      ],
      calification: 8.5,
      releaseDate: "2006-10-06",
      images: [
        "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_.jpg"
      ]
    },
    {
      title: "Whiplash",
      description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
      director: "Damien Chazelle",
      cast: [
        "Miles Teller",
        "J.K. Simmons",
        "Paul Reiser"
      ],
      genres: [
        "Drama",
        "Music"
      ],
      calification: 8.5,
      releaseDate: "2014-10-15",
      images: [
        "https://m.media-amazon.com/images/M/MV5BMmNkODhkYjctMDMyOC00ZTNjLTkwZTItM2ExMTAxMGU1ZGQ1XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      title: "American History X",
      description: "Living a life marked by violence, neo-Nazi Derek finally goes to prison after killing two black youths. Upon his release, Derek vows to change; he hopes to prevent his brother, Danny, who idolizes Derek, from following in his footsteps.",
      director: "Tony Kaye",
      cast: [
        "Edward Norton",
        "Edward Furlong",
        "Beverly D'Angelo"
      ],
      genres: [
        "Crime",
        "Drama"
      ],
      calification: 8.5,
      releaseDate: "1998-11-20",
      images: [
        "https://m.media-amazon.com/images/M/MV5BMzhiOTQ0NDItOTg0Zi00OGVmLWE0OGEtMTI4NDM0NWMxZWU4XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Harakiri",
      "description": "When a ronin requesting seppuku at a feudal lord's palace is told of the brutal suicide of another ronin who previously visited, he reveals how their pasts are intertwined - and in doing so challenges the clan's integrity.",
      "director": "Masaki Kobayashi",
      "cast": [
        "Tatsuya Nakadai",
        "Akira Ishihama",
        "Shima Iwashita"
      ],
      "genres": [
        "Drama",
        "Mystery"
      ],
      "calification": 8.6,
      "releaseDate": "1964-08-04",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BZThiZjU5ZDQtZDI4Mi00ZGYyLTkzOTktYmIzZTFlZTkxYzg5XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Prestige",
      "description": "Rival 19th-century magicians engage in a bitter battle for trade secrets.",
      "director": "Christopher Nolan",
      "cast": [
        "Christian Bale",
        "Hugh Jackman",
        "Scarlett Johansson"
      ],
      "genres": [
        "Drama",
        "Mystery",
        "Sci-Fi"
      ],
      "calification": 8.5,
      "releaseDate": "2006-10-20",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_.jpg"
      ]
    },
    {
      "title": "Léon: The Professional",
      "description": "12-year-old Mathilda is reluctantly taken in by Léon, a professional assassin, after her family is murdered. An unusual relationship forms as she becomes his protégée and learns the assassin's trade.",
      "director": "Luc Besson",
      "cast": [
        "Jean Reno",
        "Natalie Portman",
        "Gary Oldman"
      ],
      "genres": [
        "Action",
        "Crime",
        "Drama"
      ],
      "calification": 8.5,
      "releaseDate": "1994-11-18",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BNGRkYTNhOWQtYmI0Ni00MjZhLWJmMzAtMTA2Mjg4NGNiNDU0XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Spider-Man: Across the Spider-Verse",
      "description": "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
      "director": "Joaquim Dos Santos",
      "cast": [
        "Shameik Moore",
        "Hailee Steinfeld",
        "Oscar Isaac"
      ],
      "genres": [
        "Action",
        "Adventure",
        "Animation"
      ],
      "calification": 8.5,
      "releaseDate": "2023-06-02",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BNThiZjA3MjItZGY5Ni00ZmJhLWEwN2EtOTBlYTA4Y2E0M2ZmXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Casablanca",
      "description": "A cynical expatriate American cafe owner struggles to decide whether or not to help his former lover and her fugitive husband escape the Nazis in French Morocco.",
      "director": "Michael Curtiz",
      "cast": [
        "Humphrey Bogart",
        "Ingrid Bergman",
        "Paul Henreid"
      ],
      "genres": [
        "Drama",
        "Romance",
        "War"
      ],
      "calification": 8.5,
      "releaseDate": "1943-01-23",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BNWEzN2U1YTYtYTQyMS00NTVkLWE2NGQtZWFlMmM0MDNjMmRiXkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Usual Suspects",
      "description": "The sole survivor of a pier shoot-out tells the story of how a notorious criminal influenced the events that began with five criminals meeting in a seemingly random police lineup.",
      "director": "Bryan Singer",
      "cast": [
        "Kevin Spacey",
        "Gabriel Byrne",
        "Benicio Del Toro"
      ],
      "genres": [
        "Crime",
        "Drama",
        "Mystery"
      ],
      "calification": 8.5,
      "releaseDate": "1995-08-16",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BOTE5MDUxZDUtZWZmZC00NDVmLWFhOGQtNWI2YTc4NzY3MGQ0XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "The Intouchables",
      "description": "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.",
      "director": "Olivier Nakache",
      "cast": [
        "François Cluzet",
        "Omar Sy",
        "Anne Le Ny"
      ],
      "genres": [
        "Comedy",
        "Drama"
      ],
      "calification": 8.5,
      "releaseDate": "2011-11-02",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_.jpg"
      ]
    },
    {
      "title": "Cinema Paradiso",
      "description": "Salvatore, a famous film director, returns to his hometown for the funeral of the local theater's film projectionist, Alfredo. He reminisces about his life as a young boy falling in love with cinema.",
      "director": "Giuseppe Tornatore",
      "cast": [
        "Philippe Noiret",
        "Enzo Cannavale",
        "Antonella Attili"
      ],
      "genres": [
        "Drama",
        "Romance"
      ],
      "calification": 8.5,
      "releaseDate": "1990-02-23",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BMTljNzc4YWEtYTZlMS00ODMyLWIwMTAtNWQxY2VkMDEwYTk5XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Modern Times",
      "description": "The Tramp struggles to live in modern industrial society with the help of a young homeless woman.",
      "director": "Charlie Chaplin",
      "cast": [
        "Charlie Chaplin",
        "Paulette Goddard",
        "Henry Bergman"
      ],
      "genres": [
        "Comedy",
        "Drama",
        "Romance"
      ],
      "calification": 8.5,
      "releaseDate": "1936-02-25",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BODVkZGFhNGQtYjdiYi00Njc4LWFmYTItNTlmNzJjMTg1ZDc5XkEyXkFqcGc@._V1_.jpg"
      ]
    },
    {
      "title": "Alien",
      "description": "After investigating a mysterious transmission of unknown origin, the crew of a commercial spacecraft encounters a deadly lifeform.",
      "director": "Ridley Scott",
      "cast": [
        "Sigourney Weaver",
        "Tom Skerritt",
        "John Hurt"
      ],
      "genres": [
        "Horror",
        "Sci-Fi"
      ],
      "calification": 8.5,
      "releaseDate": "1979-06-22",
      "images": [
        "https://m.media-amazon.com/images/M/MV5BN2NhMDk2MmEtZDQzOC00MmY5LThhYzAtMDdjZGFjOGZjMjdjXkEyXkFqcGc@._V1_.jpg"
      ]
    }
]