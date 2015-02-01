using System.Threading.Tasks;
using AngularJS_SignalR.Models.Notes;

namespace AngularJS_SignalR.Hubs.Notes
{
    // Client callbacks
    public interface INotesCallbacks
    {
        // Notify note added
        Task BroadcastNewNote(Note newNote);
        // Notify note removed
        Task BroadcastRemoveNote(int noteId);
    }
}