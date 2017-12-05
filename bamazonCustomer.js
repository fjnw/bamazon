var Mysql = require("mysql");
var Inq = require("inquirer");
var Table = require('cli-table');

// create the connection information for the sql database
var connection = Mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  
  // Connection Check
  console.log("connected as id " + connection.threadId + "\n");
  printProducts();  
});

function printProducts() {

	// var inv = "SELECT COUNT(item_id) FROM products p";
	// connection.query(inv, function(err, res) {
	// 	console.log("We have " + JSON.stringify(res.count("SELECT item_id, product_name, price FROM productsSELECT item_id, product_name, price FROM productst")) + " items available in the store:");
	// });


	var query = "SELECT item_id, product_name, price FROM products";
	connection.query(query, function(err, res) {
		// console.log("This is what's available in our store:")

		var table = new Table({
			head: ['ID','Product Name','Price'],
			colWidths: [5, 15, 15]
		});

		for (i = 0; i<res.length; i++) {
			table.push(
				[res[i].item_id, res[i].product_name, res[i].price]
			);
		}

		console.log(table.toString());
		salesPitch();
	});
}


function salesPitch() {
	Inq.prompt([
		{
			name: 'choice',
			message: 'What item (by ID) do you want to buy?'
		},
	   {
	      name: 'quantity',
	      message: 'How many do you want?'
	   }
	]).then(function(res){

		console.log(res.choice + res.quantity);

		//transaction(res.choice, res.quantity)
	})
}

// function transaction(item, quantity) {
// 	var query = "SELECT item_id, stock_quantity FROM products WHERE item_id IN " + item;

// 	connection.query(query, function(err, res) {
// 		if (err) console.log("Query error.");

// 		console.log(res);
// 		}
// 	});

	// var update = "UPDATE products SET ";

	// connection.query(query, function(err, res) {
	// 	if (err) console.log("Error in the transaction.");
	// });

