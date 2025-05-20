using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;


namespace G.SERVICE
{
    public static class EncryptionHelper
    {

        public static string Encrypt(string data)
        {
            string _strData = data;
            string _strEncrypted;
            try
            {
                const string cryptoKey = "ORA_ET_LABORA_MEANS_PRAY_AND_WORK";
                byte[] IV = new byte[8] { 240, 3, 45, 29, 0, 76, 173, 59 };
                byte[] buffer = System.Text.Encoding.ASCII.GetBytes(_strData);
                System.Security.Cryptography.TripleDESCryptoServiceProvider des = new System.Security.Cryptography.TripleDESCryptoServiceProvider();
                System.Security.Cryptography.MD5CryptoServiceProvider MD5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
                des.Key = MD5.ComputeHash(System.Text.ASCIIEncoding.ASCII.GetBytes(cryptoKey));
                des.IV = IV;
                _strEncrypted = Convert.ToBase64String(des.CreateEncryptor().TransformFinalBlock(buffer, 0, buffer.Length));
            }
            catch (Exception)
            {
                return "";
            }
            return _strEncrypted;
        }
        public static string Decrypt(string data)
        {
            string _strData = data;
            string _strDecrypted;
            try
            {
                const string cryptoKey = "ORA_ET_LABORA_MEANS_PRAY_AND_WORK";
                byte[] IV = new byte[8] { 240, 3, 45, 29, 0, 76, 173, 59 };
                byte[] buffer = Convert.FromBase64String(_strData);
                System.Security.Cryptography.TripleDESCryptoServiceProvider des = new System.Security.Cryptography.TripleDESCryptoServiceProvider();
                System.Security.Cryptography.MD5CryptoServiceProvider MD5 = new System.Security.Cryptography.MD5CryptoServiceProvider();
                des.Key = MD5.ComputeHash(System.Text.ASCIIEncoding.ASCII.GetBytes(cryptoKey));
                des.IV = IV;
                _strDecrypted = System.Text.Encoding.ASCII.GetString(des.CreateDecryptor().TransformFinalBlock(buffer, 0, buffer.Length));
            }
            catch (Exception)
            {
                return "";
            }
            return _strDecrypted;
        }
    }
}
