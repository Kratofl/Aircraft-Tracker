namespace Aircraft_Tracker.Core.Api.exceptions
{
    [Serializable]
    public class RequestNotSuccessfullException : Exception
    {
        public RequestNotSuccessfullException(string? message) : base(message)
        { }
    }
}
