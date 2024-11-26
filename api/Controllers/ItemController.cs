using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Exam.DAL;
using Exam.Models;
using Exam.ViewModels;
using Exam.Utilities;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Exam.DTOs;

namespace Exam.Controllers{ 
    

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

        // Action to display Products.cshtml
      public async Task<IActionResult> Products()
{
    var items = await _itemRepository.GetAll(); // Get items from the repository
    if (items == null)
    {
        _logger.LogError("[ItemController] Item list not found.");
        return NotFound("Item list not found");
    }

    var viewModel = new ItemsViewModel
    {
        Items = items.ToList(), // Ensure that 'Items' is populated correctly
        TotalPages = (int)Math.Ceiling(items.Count() / (double)6),
        CurrentPage = 1
    };

    return View(viewModel); // Pass the populated view model
}


        // Action to display items in grid layout with pagination
        public async Task<IActionResult> Grid(int page = 1, int pageSize = 6)
{
    var items = await _itemRepository.GetAll();
    if (items == null)
    {
        _logger.LogError("[ItemController] Item list not found while executing _itemRepository.GetAll()");
        return NotFound("Item list not found");
    }

    var totalItems = items.Count();
    var pagedItems = items.Skip((page - 1) * pageSize).Take(pageSize).ToList();

    var viewModel = new ItemsViewModel
    {
        Items = pagedItems,
        TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize),
        CurrentPage = page
    };

    // Check for AJAX request to return only the items as partial view
    if (Request.Headers["X-Requested-With"] == "XMLHttpRequest")
    {
        return PartialView("_ItemCardsPartial", viewModel);
    }

    // For full page load
    return View(viewModel);
}


        // Partial view action for table view
        public async Task<IActionResult> TablePartial()
        {
            var items = await _itemRepository.GetAll();
            if (items == null)
            {
                _logger.LogError("[ItemController] Item list not found while executing _itemRepository.GetAll()");
                return NotFound("Item list not found");
            }

            var viewModel = new ItemsViewModel
            {
                Items = items
            };

            return PartialView("Table", viewModel);
        }

        // Action to display items in table layout
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

        // Action to display the details of a specific item by its ID
        public async Task<IActionResult> Details(int id)
        {
            var item = await _itemRepository.GetItemById(id);
            if (item == null)
            {
                return NotFound("Item not found for the ItemId");
            }

            return PartialView("Details", item);
        }

        // Action to return the form for creating a new item (GET request)
        [HttpGet]
        [Authorize]
        public IActionResult Create()
        {
            return View();
        }
        

        // New Create method to check eligibility and save the item
        [HttpPost]
[Authorize]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Create(Item item, IFormFile ImageFile)
{
    if (ModelState.IsValid)
    {
        // Handle the file upload if provided
        if (ImageFile != null && ImageFile.Length > 0)
        {
            var filePath = Path.Combine("wwwroot/images", ImageFile.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await ImageFile.CopyToAsync(stream);
            }

            item.ImageUrl = "/images/" + ImageFile.FileName;
        }

        // Check if the item qualifies for the Nøkkelhullet symbol
        item.HasGreenKeyhole = NokkelhullValidator.IsEligibleForNokkelhull(item);

        // Save the item to the repository
        bool success = await _itemRepository.Create(item);
        if (success)
        {
            // Redirect to the Products view after successful creation
            return RedirectToAction(nameof(Products));
        }

        _logger.LogError("[ItemController] Failed to save the item to the repository.");
    }

    // Return to the Create view with the item to show errors if creation fails
    return View(item);
}


        // Action to return the form for updating an existing item (GET request)
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
[ValidateAntiForgeryToken]
public async Task<IActionResult> Update(Item item, IFormFile ImageFile)
{
    if (ModelState.IsValid)
    {
        // Check if the user uploaded a new image
        if (ImageFile != null && ImageFile.Length > 0)
        {
            // Delete the old image if it exists (optional)
            if (!string.IsNullOrEmpty(item.ImageUrl))
            {
                var oldImagePath = Path.Combine("wwwroot", item.ImageUrl.TrimStart('/'));
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }

            // Save the new image
            var filePath = Path.Combine("wwwroot/images", ImageFile.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await ImageFile.CopyToAsync(stream);
            }
            item.ImageUrl = "/images/" + ImageFile.FileName; // Update the item with the new image path
        }

        // Re-check if the item qualifies for the Nøkkelhullet symbol after updating
        item.HasGreenKeyhole = NokkelhullValidator.IsEligibleForNokkelhull(item);

        // Update the item in the repository
        bool success = await _itemRepository.Update(item);
        if (success)
        {
            return RedirectToAction(nameof(Products)); // Redirect to the Products view after update
        }

        _logger.LogError("[ItemController] Failed to update the item.");
    }

    return View(item); // Return to the Update view with the item if update fails
}


        // Action to display the confirmation page for deleting an item
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

        // Action to handle the deletion of an item (POST request)
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

            return RedirectToAction(nameof(Products));
        }
    }
    public class GridViewModel
{
    public IEnumerable<Item> Items { get; set; }
    public bool ShowViewMore { get; set; }

    public GridViewModel(IEnumerable<Item> items, bool showViewMore)
    {
        Items = items;
        ShowViewMore = showViewMore;
    }
}

}
