using Exam.Models;
using System.Collections.Generic;
using System.Linq;

namespace Exam.ViewModels
{
    public class ItemsViewModel
    {
        public IEnumerable<Item> Items { get; set; } = Enumerable.Empty<Item>(); // Initialize as an empty collection
        public string? CurrentViewName { get; set; }
        public int CurrentPage { get; set; } = 1;
        public int TotalPages { get; set; } = 1;

        // Parameterless constructor
        public ItemsViewModel() { }

        // Constructor with parameters
        public ItemsViewModel(IEnumerable<Item> items, string? currentViewName, int currentPage = 1, int totalPages = 1)
        {
            Items = items;
            CurrentViewName = currentViewName;
            CurrentPage = currentPage;
            TotalPages = totalPages;
        }
    }
}
