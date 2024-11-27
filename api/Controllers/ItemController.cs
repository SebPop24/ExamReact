using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Exam.DAL;
using Exam.Models;
using Exam.ViewModels;
using Exam.DTOs;
//using Exam.Attributes;
//using Exam.Utilities;
namespace Exam.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ItemAPIController : Controller
{
    private readonly IItemRepository _itemRepository;
    private readonly ILogger<ItemController> _logger;

    public ItemAPIController(IItemRepository itemRepository, ILogger<ItemController> logger)
    {
        _itemRepository = itemRepository;
        _logger = logger;
    }

    [HttpGet("itemlist")]
    public async Task<IActionResult> ItemList()
    {
        var items = await _itemRepository.GetAll();
        if (items == null)
        {
            _logger.LogError("[ItemAPIController] Item list not found while executing _itemRepository.GetAll()");
            return NotFound("Item list not found");
        }
        var itemDtos = items.Select(item => new ItemDto
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
            HasGreenKeyhole = itemDto.HasGreenKeyhole
        };        
        bool returnOk = await _itemRepository.Create(newItem);
        if (returnOk)
            return CreatedAtAction(nameof(ItemList), new { id = newItem.ItemId }, newItem);

        _logger.LogWarning("[ItemAPIController] Item creation failed {@item}", newItem);
        return StatusCode(500, "Internal server error");
    }
}
public class ItemController : Controller
{
    private readonly IItemRepository _itemRepository;
    private readonly ILogger<ItemController> _logger;

    public ItemController(IItemRepository itemRepository, ILogger<ItemController> logger)
    {
        _itemRepository = itemRepository;
        _logger = logger;
    }

    public async Task<IActionResult> Table()
    {
        var items = await _itemRepository.GetAll();
        if (items == null)
        {
            _logger.LogError("[ItemController] Item list not found while executing _itemRepository.GetAll()");
            return NotFound("Item list not found");
        }
        var itemsViewModel = new ItemsViewModel(items, "Table");
        return View(itemsViewModel);
    }

    public async Task<IActionResult> Grid()
    {
        var items = await _itemRepository.GetAll();
        if (items == null)
        {
            _logger.LogError("[ItemController] Item list not found while executing _itemRepository.GetAll()");
            return NotFound("Item list not found");
        }
        var itemsViewModel = new ItemsViewModel(items, "Grid");
        return View(itemsViewModel);
    }

    public async Task<IActionResult> Details(int id)
    {
        var item = await _itemRepository.GetItemById(id);
        if (item == null)
        {
            _logger.LogError("[ItemController] Item not found for the ItemId {ItemId:0000}", id);
            return NotFound("Item not found for the ItemId");
        }
        return View(item);
    }

    [HttpGet]
    [Authorize]
    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create(Item item)
    {
        if (ModelState.IsValid)
        {
            bool returnOk = await _itemRepository.Create(item);
            if (returnOk)
                return RedirectToAction(nameof(Table));
        }
        _logger.LogWarning("[ItemController] Item creation failed {@item}", item);
        return View(item);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Update(int id)
    {
        var item = await _itemRepository.GetItemById(id);
        if (item == null)
        {
            _logger.LogError("[ItemController] Item not found when updating the ItemId {ItemId:0000}", id);
            return BadRequest("Item not found for the ItemId");
        }
        return View(item);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Update(Item item)
    {
        if (ModelState.IsValid)
        {
            bool returnOk = await _itemRepository.Update(item);
            if (returnOk)
                return RedirectToAction(nameof(Table));
        }
        _logger.LogWarning("[ItemController] Item update failed {@item}", item);
        return View(item);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _itemRepository.GetItemById(id);
        if (item == null)
        {
            _logger.LogError("[ItemController] Item not found for the ItemId {ItemId:0000}", id);
            return BadRequest("Item not found for the ItemId");
        }
        return View(item);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        bool returnOk = await _itemRepository.Delete(id);
        if (!returnOk)
        {
            _logger.LogError("[ItemController] Item deletion failed for the ItemId {ItemId:0000}", id);
            return BadRequest("Item deletion failed");
        }
        return RedirectToAction(nameof(Table));
    }
}