<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$logFile = __DIR__ . '/js_error.log';

$userAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : 'unknown';
$msg = isset($_POST['msg']) ? trim($_POST['msg']) : '';
$url = isset($_POST['url']) ? trim($_POST['url']) : 'unknown';
$line = isset($_POST['line']) ? (int)$_POST['line'] : 'unknown';
$col = isset($_POST['col']) ? (int)$_POST['col'] : 'unknown';
$trace = isset($_POST['trace']) ? trim($_POST['trace']) : 'unknown';
$page = isset($_POST['page']) ? trim($_POST['page']) : 'unknown';

$entry = date('c') . ' page: ' . $page . "\nscript: " . $url . "\n"
	. $msg . ' on line:' . $line . ', column:' . $col . "\n"
	. "trace:\n" . $trace . "\n"
	. 'UA:' . $userAgent . ', IP:' . $_SERVER['REMOTE_ADDR'] . "\n" . str_repeat('-', 80) . "\n";

file_put_contents($logFile, $entry, FILE_APPEND);