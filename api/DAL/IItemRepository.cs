using Exam.Models;

namespace Exam.DAL;

//Defines CRUD operations for Item management.

public interface IItemRepository
{
    Task<IEnumerable<Item>?> GetAll();
    Task<Item?> GetItemById(int id);
    Task<bool> Create(Item item);
    Task<bool> Update(Item item);
    Task<bool> Delete(int id);
}

