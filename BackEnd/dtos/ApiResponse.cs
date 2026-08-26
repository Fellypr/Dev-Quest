using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.dtos
{
    public class ApiResponse<T>
    {
        public bool Sucesso {get;set;}
        public string Mensagem { get; set; } = string.Empty;
        public T Dados {get;set;}


        public static ApiResponse<T> Ok (T dados , string mensagem = "Operação realizada com sucesso")
        {
            return new ApiResponse<T>
            {
                Sucesso = true,
                Mensagem = mensagem,
                Dados = dados
            };
        }
        public static ApiResponse<T> Erro(T dados,string mensagem = "Erro de operação")
        {
            return new ApiResponse<T>
            {
              Sucesso = false,
              Mensagem = mensagem,
              Dados = default  
            };
            
        }
        
    }
}