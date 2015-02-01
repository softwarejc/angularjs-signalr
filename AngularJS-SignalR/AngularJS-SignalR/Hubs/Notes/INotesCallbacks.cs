using System.Threading.Tasks;
using AngularJS_SignalR.Models.Notes;

namespace AngularJS_SignalR.Hubs.Notes
{
    public interface INotesCallbacks
    {
        // Client callbacks
        Task BroadcastNewNote(Note newNote);
        Task BroadcastRemoveNote(int noteId);
    }
}