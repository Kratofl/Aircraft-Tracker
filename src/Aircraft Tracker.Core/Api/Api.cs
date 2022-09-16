using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aircraft_Tracker.Core.Api
{
    public class Api
    {
        private readonly HttpClient _httpClient;

        public Api(string baseUrl)
        {
            this._httpClient = new HttpClient();
            this._httpClient.BaseAddress = new Uri(baseUrl);
        }

        public async Task<string> GetRequestAsync(string relativePath)
        {
            var response = await this._httpClient.GetAsync($"{this._httpClient.BaseAddress}{this.FormatRelativePath(relativePath)}");
            return response.Content.ReadAsStringAsync().Result;
        }
        public async Task<string> GetRequestAsync(string relativePath, List<KeyValuePair<string, string>> parameters)
        {
            string parametersString = this.GetParamtersAsString(parameters);

            var uri = $"{this.FormatRelativePath(relativePath)}?{parametersString}";
            var response = await this.GetRequestAsync(uri);

            return response;
        }

        //public string PostRequest(string relativePath, string jsonBody);
        //public string PostRequest(string relativePath, Dictionary<string, string> parameters, string jsonBody);

        private string GetParamtersAsString(List<KeyValuePair<string, string>> parameters)
        {
            List<string> strings = new List<string>();
            foreach (var parameter in parameters)
            {
                strings.Add($"{parameter.Key}={parameter.Value}");
            }
            var parametersString = string.Join("&", strings);
            return parametersString;
        }
        private string FormatRelativePath(string path)
        {
            var output = path.Trim();
            if (path.StartsWith('/'))
            {
                output = path.Remove(0);
            }
            if (path.EndsWith('/'))
            {
                output = path.Remove(path.Length - 1);
            }
            return output;
        }
    }
}
