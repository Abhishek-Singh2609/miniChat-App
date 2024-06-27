//this is only work for one element
// // Get the button element
// const deleteBtn = document.querySelectorAll('.deleteBtn');

// // Add event listener to the button
// deleteBtn.addEventListener('click', function() {
//     // Display confirmation dialog
//     const isConfirmed = window.confirm('Are you sure you want to delete this data?');

//     // Check if user confirmed
//     if (isConfirmed) {
//         // If confirmed, proceed with deletion
//         // You can place your deletion logic here
//         console.log('Data deleted successfully');
//     } else {
//         // If not confirmed, do nothing or display a message
//         console.log('Deletion cancelled by user');
//     }
// });

const deleteButtons = document.querySelectorAll('.deleteBtn');

deleteButtons.forEach(function(deleteBtn) {
    deleteBtn.addEventListener('click', function(event) {
        // Prevent the default behavior of the button (form submission)
        event.preventDefault();

        // Display confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this data?');

        // Check if user confirmed
        if (isConfirmed) {
            // If confirmed, proceed with form submission (deletion)
            deleteBtn.closest('form').submit();
        } else {
            // If not confirmed, do nothing
            console.log('Deletion cancelled by user');
        }
    });
});