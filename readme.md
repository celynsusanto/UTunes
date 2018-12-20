Mahdi:
    - Table Artist - seed (v)
        +models assoc (v)
    - Table Song-User & Conjunction table SongUser
        + model assoc (v)
    - Table Users
        + model assoc (v)
        + login page (v)
        + register page (v)

Celyn
    - Table Song - seed
    - Table Playlist - Song & Conjunction table Playlist

All Models Associations (checked)
Seed all Artists Data (checked)
Seed all Songs Data  ==> Celyn (checked)
Playlist routes ==> Celyn (checked)
User routes ==> Mahdi (checked)
Partials Navbar (checked)


VIEWS
homepage (done: need improvement)
login page (done: need improvement)

ROUTING
Users:
  - Create
  - Update 
  - Read (correction needed)
  - Delete (checked)

-------------------------------------------------------------------------
config Mahdi
{
  "development": {
    "username": "postgres",
    "password": null,
    "database": "utunes_project",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5430
  }
}
