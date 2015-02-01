using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularJS_SignalR.Models.Notes
{
    public class NotesService
    {
        public class IdentifierProvider
        {
            private static int id;
            public static int GetNewId()
            {
                return ++id;
            }
        }

        private static readonly List<Note> notesList = new List<Note>
        {
            new Note("Learn Underscore"),
            new Note("Learn Ionic Framework"),
            new Note("Learn AngularJS Google maps"),
        };

        public static bool Remove(int noteId)
        {
            var noteToRemove = notesList.SingleOrDefault(note => note.Id == noteId);
            return noteToRemove != null && notesList.Remove(noteToRemove);
        }

        public static Note Add(string note)
        {
            var newNote = new Note(note);
            notesList.Add(newNote);

            return newNote;
        }

        public static IEnumerable<Note> GetAll()
        {
            return notesList;
        }
    }
}