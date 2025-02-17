<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include PhpSpreadsheet library
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

// Function to load existing spreadsheet or create new one
function getSpreadsheet() {
    $file = 'responses.xlsx';
    if (file_exists($file)) {
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file);
        return $spreadsheet;
    }
    
    // Create new spreadsheet with headers
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();
    $headers = [
        'Timestamp', 'First Name', 'Last Name', 'Email', 'Location', 'Phone',
        'User Type', 'Age Category', 'Professional Ranking', 'Academy Name',
        'Number of Players', 'Reports Per Month', 'Custom Reports'
    ];
    $sheet->fromArray([$headers], NULL, 'A1');
    return $spreadsheet;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $formData = [
        date('Y-m-d H:i:s'),
        $_POST['firstName'] ?? '',
        $_POST['lastName'] ?? '',
        $_POST['email'] ?? '',
        $_POST['location'] ?? '',
        $_POST['phone'] ?? '',
        $_POST['userType'] ?? '',
        $_POST['playerAge'] ?? '',
        $_POST['ranking'] ?? '',
        $_POST['academyName'] ?? '',
        $_POST['numberOfPlayers'] ?? '',
        $_POST['reportsPerMonth'] ?? '',
        $_POST['customReports'] ?? ''
    ];

    // Load or create spreadsheet
    $spreadsheet = getSpreadsheet();
    $sheet = $spreadsheet->getActiveSheet();
    
    // Find next empty row
    $row = $sheet->getHighestRow() + 1;
    
    // Add new response
    $sheet->fromArray([$formData], NULL, 'A' . $row);
    
    // Save spreadsheet
    $writer = new Xlsx($spreadsheet);
    $writer->save('responses.xlsx');

    // Prepare email content
    $to = "ziad.sakr40@gmail.com";
    $subject = "New Core Analytics Signup";
    
    $message = "New signup details:\n\n";
    $message .= "Name: {$_POST['firstName']} {$_POST['lastName']}\n";
    $message .= "Email: {$_POST['email']}\n";
    $message .= "Location: {$_POST['location']}\n";
    $message .= "Phone: {$_POST['phone']}\n";
    $message .= "User Type: {$_POST['userType']}\n";
    
    if ($_POST['userType'] == 'player' || $_POST['userType'] == 'parent') {
        $message .= "Age Category: {$_POST['playerAge']}\n";
        if ($_POST['playerAge'] == 'professional') {
            $message .= "Professional Ranking: {$_POST['ranking']}\n";
        }
    }
    
    if ($_POST['userType'] == 'academy') {
        $message .= "Academy Name: {$_POST['academyName']}\n";
        $message .= "Number of Players: {$_POST['numberOfPlayers']}\n";
    }
    
    if ($_POST['userType'] == 'coach') {
        $message .= "Number of Players: {$_POST['numberOfPlayers']}\n";
    }
    
    $message .= "Reports Per Month: ";
    if ($_POST['reportsPerMonth'] == 'custom') {
        $message .= "{$_POST['customReports']}\n";
    } else {
        $message .= "{$_POST['reportsPerMonth']}\n";
    }
    
    $headers = "From: noreply@core-analytics.ai";
    
    // Send email
    mail($to, $subject, $message, $headers);
    
    // Send success response
    echo json_encode(['success' => true]);
} else {
    // Send error response
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>
