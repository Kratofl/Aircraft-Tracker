using Aircraft_Tracker.Core.Database.Tables;
using Duende.IdentityServer.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Aircraft_Tracker.Web.Controllers.api
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] LoginInput loginInput)
        {
            if (string.IsNullOrEmpty(loginInput.UserName) || string.IsNullOrEmpty(loginInput.Password))
                return BadRequest("Values are missing");

            ApplicationUser user = await _userManager.FindByNameAsync(loginInput.UserName);
            if (user is null)
                return BadRequest("Username is wrong");

            var result = await _signInManager.PasswordSignInAsync(user, loginInput.Password, true, false);

            if (!result.Succeeded)
            {
                return BadRequest();
            }

            return Ok(new
            {
                Authenticated = true
            });
        }
        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> RegisterAsync([FromBody] LoginInput loginInput)
        {
            if (string.IsNullOrEmpty(loginInput.UserName) || string.IsNullOrEmpty(loginInput.Password))
                return BadRequest("Values are missing");

            ApplicationUser user = await _userManager.FindByNameAsync(loginInput.UserName);
            if (user is not null)
                return BadRequest("Username already exists");

            user = new ApplicationUser
            {
                Email = loginInput.UserName,
                UserName = loginInput.UserName,
                EmailConfirmed = true,
            };
            var userResult = await _userManager.CreateAsync(user);
            var passwordResult = await _userManager.AddPasswordAsync(user, loginInput.Password);

            if (!userResult.Succeeded || !passwordResult.Succeeded)
            {
                return BadRequest();
            }

            return Ok();
        }
        public class LoginInput
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        [Route("logout")]
        [HttpGet]
        public async Task<IActionResult> LogoutAsync()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [Route("status")]
        [HttpGet]
        public async Task<IActionResult> StatusAsync()
        {
            if (!User.IsAuthenticated()) {
                return Unauthorized();
            }

            return Ok(new { User.Identity.Name });
        }
    }
}
