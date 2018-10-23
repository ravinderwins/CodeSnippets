using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DITSPortal.DataAccess.IDataAccess
{
    public interface IRepository<T> where T : class
    {
        T Get<Tkey>(T id);
        IQueryable<T> GetAll();
        bool Add(T entity);
        void Update(T entity);
        T GetSingle(Expression<Func<T, bool>> whereCondition);
        List<T> GetAll(Expression<Func<T, bool>> whereCondition);
        void Delete(T entity);

       Task<bool> AddAsync(T entity);
        Task UpdateAsync(T entity);
    }
}
