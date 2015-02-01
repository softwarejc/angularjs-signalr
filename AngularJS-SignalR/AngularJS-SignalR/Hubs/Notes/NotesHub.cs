using System.Threading.Tasks;
using AngularJS_SignalR.Models.Notes;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace AngularJS_SignalR.Hubs.Notes
{
    [HubName("notesHub")]
    public class NotesHub : Hub<INotesCallbacks>, INotesCalls
    {
        public async Task AddNote(string note)
        {
            Note newNote = NotesService.Add(note);

            // All connected clients will receive this call
            await Clients.All.BroadcastNewNote(newNote);
        }

        public async Task RemoveNote(int noteId)
        {
            if (NotesService.Remove(noteId))
            {
                // All connected clients will receive this call
                await Clients.All.BroadcastRemoveNote(noteId);
            }
        }
    }


}