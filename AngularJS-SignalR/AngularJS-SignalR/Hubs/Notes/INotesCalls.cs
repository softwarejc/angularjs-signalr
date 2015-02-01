using System.Threading.Tasks;

namespace AngularJS_SignalR.Hubs.Notes
{
    public interface INotesCalls
    {
        // Client calls
        Task AddNote(string note);
        Task RemoveNote(int roomId);
    }
}