using System.Runtime.Serialization;

namespace AngularJS_SignalR.Models.Notes
{
    [DataContract]
    public class Note
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Note"/> class.
        /// </summary>
        /// <param name="note">The note.</param>
        public Note(string note)
        {
            this.Text = note;
            this.Id = NotesService.IdentifierProvider.GetNewId();
        }

        [DataMember(Name = "text", IsRequired = false)]
        public string Text { get; set; }

        [DataMember(Name = "id", IsRequired = false)]
        public int Id { get; set; }
    }
}