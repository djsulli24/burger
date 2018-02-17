var connection = require('./connection');

var orm = {
  objToSql: function(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  },
  printQuestionMarks: function(num) {
    var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
  },
  selectAll: function(table, cb) {
    connection.query(`SELECT * FROM ${table};`, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  insertOne: function(table, cols, valuesArray, cb) {
    console.log(`INSERT INTO ${table} (${cols.toString()}) VALUES (${this.printQuestionMarks(valuesArray.length)});`);
    connection.query(`INSERT INTO ${table} (${cols.toString()}) VALUES (${this.printQuestionMarks(valuesArray.length)});`, valuesArray, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  updateOne: function(table, objColVals, condition, cb) {
    connection.query(`UPDATE ${table} SET ${this.objToSql(objColVals)} WHERE ${condition};`, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
}

module.exports = orm;