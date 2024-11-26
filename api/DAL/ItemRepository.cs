using Microsoft.EntityFrameworkCore;
using Exam.Models;

namespace Exam.DAL;

// Implementation of the IItemRepository interface
public class ItemRepository : IItemRepository
{
    private readonly ItemDbContext _db; // Database context

    private readonly ILogger<ItemRepository> _logger; // Logger for logging errors and events

    // Constructor to inject dependencies: database context and logger
    public ItemRepository(ItemDbContext db, ILogger<ItemRepository> logger)
    {
        _db = db;
        _logger = logger;
    }

    // Asynchronously retrieves all items from the database
    public async Task<IEnumerable<Item>?> GetAll()
    {
        try
        {
            return await _db.Items.ToListAsync(); // Retrieves all items
        }
        catch (Exception e)
        {
             // Logs an error if the retrieval fails
            _logger.LogError("[ItemRepository] items ToListAsync() failed when GetAll(), error message: {e}", e.Message);
            return null;
        }
    }

    // Asynchronously retrieves a single item by ID
    public async Task<Item?> GetItemById(int id)
    {
        try
        {
            return await _db.Items.FindAsync(id); // Finds the item by ID
        }
        catch (Exception e)
        {
            // Logs an error if retrieval fails
            _logger.LogError("[ItemRepository] item FindAsync(id) failed when GetItemById for ItemId {ItemId:0000}, error message: {e}", id, e.Message);
            return null;
        }
    }

    // Asynchronously creates a new item in the database
    public async Task<bool> Create(Item item)
    {
        try
        {
            _db.Items.Add(item); // Adds the new item to the context
            await _db.SaveChangesAsync(); // Saves the changes to the database
            return true; // Returns true if successful
        }
        catch (Exception e)
        {
            // Logs an error if item creation fails
            _logger.LogError("[ItemRepository] item creation failed for item {@item}, error message: {e}", item, e.Message);
            return false;
        }
    }

    // Asynchronously updates an existing item in the database
    public async Task<bool> Update(Item item)
    {
        try
        {
            _db.Items.Update(item); // Updates the item in the context
            await _db.SaveChangesAsync(); // Saves the changes to the database
            return true; // Returns true if successful
        }
        catch (Exception e)
        {
             // Logs an error if updating fails
            _logger.LogError("[ItemRepository] item FindAsync(id) failed when updating the ItemId {ItemId:0000}, error message: {e}", item, e.Message);
            return false;
        }
    }
    // Asynchronously deletes an item by ID
    public async Task<bool> Delete(int id)
    {
        try
        {
            var item = await _db.Items.FindAsync(id); // Finds the item by ID
            if (item == null)
            {
                // Logs an error if the item is not found
                _logger.LogError("[ItemRepository] item not found for the ItemId {ItemId:0000}", id);
                return false; // Returns false if the item doesn't exist
            }

            _db.Items.Remove(item); // Removes the item from the context
            await _db.SaveChangesAsync(); // Saves the changes to the database
            return true; // Returns true if deletion is successful
        }
        catch (Exception e)
        {
            // Logs an error if deletion fails
            _logger.LogError("[ItemRepository] item deletion failed for the ItemId {ItemId:0000}, error message: {e}", id, e.Message);
            return false;
        }
    }
}

