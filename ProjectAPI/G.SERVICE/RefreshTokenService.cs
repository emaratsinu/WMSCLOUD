using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace G.SERVICE
{
    public interface IRefreshTokenService
    {
        IDictionary<long, string> GetRefreshTokens();

        void add(long userId, string refreshTokenModel);
    }


    public class RefreshTokenService : IRefreshTokenService
    {
        private static readonly IDictionary<long, string> _refreshTokens = new Dictionary<long, string>();

        public IDictionary<long, string> GetRefreshTokens()
        {
            return _refreshTokens;
        }

        public void add(long userId, string refreshTokenModel)
        {
            _refreshTokens[userId] = refreshTokenModel;
        }
    }
}