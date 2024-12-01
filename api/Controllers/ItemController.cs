using Microsoft.AspNetCore.Mvc;
using Exam.DAL;
using Exam.Models;
using Exam.DTOs;
using Exam.Utilities;
namespace Exam.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ItemAPIController : Controller
{
    private readonly IItemRepository _itemRepository;
    private readonly ILogger<ItemAPIController> _logger;

    //Initializes the controller with dependencies for database operations and logging.
    public ItemAPIController(IItemRepository itemRepository, ILogger<ItemAPIController> logger)
    {
        _itemRepository = itemRepository;
        _logger = logger;
    }
    //Retrieves all items, converts them to DTOs, and returns them or a "Not Found" error if empty.
    [HttpGet("itemlist")]
    public async Task<IActionResult> ItemList()
    {
        var items = await _itemRepository.GetAll();
        if (items == null)
        {
            _logger.LogError("[ItemAPIController] Item list not found while executing _itemRepository.GetAll()");
            return NotFound("Item list not found");
        }
        var itemDtos = items.Select(item => new Item
        {
            ItemId = item.ItemId,
            Name = item.Name,
            Food_Group = item.Food_Group,
            Energi_Kj = item.Energi_Kj,
            Fett = item.Fett,
            Protein = item.Protein,
            Karbohydrat = item.Karbohydrat,
            Salt = item.Salt,
            ImageUrl = item.ImageUrl,
            HasGreenKeyhole = item.HasGreenKeyhole
        });
        return Ok(itemDtos);
    }

    //Creates a new item from the DTO, saves it, and returns it or a 500 error if creation fails.
    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] ItemDto itemDto)
    {
        if (itemDto == null)
        {
            return BadRequest("Item cannot be null");
        }
        var newItem = new Item
        {
            ItemId = itemDto.ItemId,
            Name = itemDto.Name,
            Food_Group = itemDto.Food_Group,
            Energi_Kj = itemDto.Energi_Kj,
            Fett = itemDto.Fett,
            Protein = itemDto.Protein,
            Karbohydrat = itemDto.Karbohydrat,
            Salt = itemDto.Salt,
            ImageUrl = itemDto.ImageUrl,
            HasGreenKeyhole = NokkelhullValidator.IsEligibleForNokkelhull(itemDto)
        };
        bool returnOk = await _itemRepository.Create(newItem);
        if (returnOk)
            return CreatedAtAction(nameof(ItemList), new { id = newItem.ItemId }, newItem);

        _logger.LogWarning("[ItemAPIController] Item creation failed {@item}", newItem);
        return StatusCode(500, "Internal server error");
    }
    //Retrieves an item by ID, returning it or a "Not Found" error if it doesn't exist.
    [HttpGet("{id}")]
    public async Task<IActionResult> GetItem(int id)
    {
        var item = await _itemRepository.GetItemById(id);
        if (item == null)
        {
            _logger.LogError("[ItemAPIController] Item not found for the ItemId {ItemId:0000}", id);
            return NotFound("Item not found for the ItemId");
        }
        return Ok(item);
    }

    //Updates an existing item by ID with data from the DTO, returning the updated item or a 500 error if the update fails.
    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] ItemDto itemDto)
    {
        if (itemDto == null)
        {
            return BadRequest("Item data cannot be null");
        }
        // Find the item in the database
        var existingItem = await _itemRepository.GetItemById(id);
        if (existingItem == null)
        {
            return NotFound("Item not found");
        }
        // Update the item properties
        existingItem.Name = itemDto.Name;
        existingItem.Food_Group = itemDto.Food_Group;
        existingItem.Energi_Kj = itemDto.Energi_Kj;
        existingItem.Fett = itemDto.Fett;
        existingItem.Protein = itemDto.Protein;
        existingItem.Karbohydrat = itemDto.Karbohydrat;
        existingItem.Salt = itemDto.Salt;
        existingItem.ImageUrl = itemDto.ImageUrl;
        existingItem.HasGreenKeyhole = NokkelhullValidator.IsEligibleForNokkelhull(itemDto);

        bool updateSuccessful = await _itemRepository.Update(existingItem);
        if (updateSuccessful)
        {
            return Ok(existingItem); // Return the updated item
        }

        _logger.LogWarning("[ItemAPIController] Item update failed {@item}", existingItem);
        return StatusCode(500, "Internal server error");
    }
    //Deletes an item by ID, returning 204 if successful or an error if it fails.
    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        bool returnOk = await _itemRepository.Delete(id);
        if (!returnOk)
        {
            _logger.LogError("[ItemAPIController] Item deletion failed for the ItemId {ItemId:0000}", id);
            return BadRequest("Item deletion failed");
        }
        return NoContent(); // 200 Ok is commonly used when the server returns a response body with additional information about the result of the request. For a DELETE operation, there's generally no need to return additional data, making 204 NoContent a better fit.
    }
}