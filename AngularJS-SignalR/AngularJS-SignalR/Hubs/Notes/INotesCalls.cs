using System.Collections.Generic;
using System.Threading.Tasks;
using AngularJS_SignalR.Models.Notes;

namespace AngularJS_SignalR.Hubs.Notes
{
    // Client calls
    public interface INotesCalls
    {
        // Add note
        Task AddNote(string note);
        // Get all notes
        IEnumerable<Note> GetAllNotes();
        // Remove note
        Task RemoveNote(int roomId);
    }
}