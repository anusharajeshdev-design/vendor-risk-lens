using System.Security.Claims;

namespace VRL.API.Services;

public class CurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(
        IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string Username
    {
        get
        {
            return _httpContextAccessor
                .HttpContext?
                .User?
                .FindFirst(ClaimTypes.Name)?
                .Value ?? "System";
        }
    }
}