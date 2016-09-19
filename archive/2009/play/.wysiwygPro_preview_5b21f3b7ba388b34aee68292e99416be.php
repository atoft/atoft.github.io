<?php
if ($_GET['randomId'] != "Ve8KJrWJ00iMlz2zyvzNM0JbM1en36HYCoIv7nG32WsfPnwswoRUDqzoVxHUXs8E") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
