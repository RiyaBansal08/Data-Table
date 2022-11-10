

(function () {

    var editInfo = null;
    
    var search_input="";

    var data;
    var mytable;
    function getData(d,mytableId){
        data=d;
        mytable=mytableId;
        window.data1 = data;
        window.search_data = data;
    }

    window.getData=getData;
    
    function generateTable(filtered_data) {
        if(filtered_data==undefined)
            filtered_data=[...data];
        mytable.innerHTML = "";

        search_box=document.createElement('input');
        search_box.setAttribute('type','text');
        search_box.setAttribute('placeholder','Enter Username');
       // console.log(search_box);

        var label=document.createElement('label');
        label.innerHTML="<br><b><i>Search</i></b> ";

        var search_btn=document.createElement('button');
        search_btn.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>`;
        search_btn.style.border="none";
        search_btn.style.padding="0px";
        search_btn.style.margin="0 3px 3px 3px";

        mytable.append(label);
        mytable.append(search_box);
        mytable.append(search_btn);

        search_info=[];
        search_btn.addEventListener('click',search_obj);

        var table = document.createElement('table');
        
        
        //var table = "<table>";
        table.append(generateHead(data[0]));
        table.append(generateBody(filtered_data));
        table.append(generateFoot(data[0]));
        //table+="</table>";
        mytable.append(table);
    }

    function search_obj(){
        search_input=search_box.value;
        if(search_input=="")
            generateTable(data);
        else{

        function search_item(search_data){
            return search_data.Username==search_input;
        }

        search_info=search_data.filter(search_item)
            generateTable( search_info);
        }
    }

    function generateHead(obj) {
        var thead = document.createElement('thead');
        //var head = "<thead>";
        thead.append(generateHeadRow(obj));
        // head = head + "</thead>";
        return thead;
    }

    function generateBody(data) {
        var tbody = document.createElement('tbody');
        //var body = "<tbody>";
        var i = 0;
        for (var obj of data) {
            tbody.append(generateBodyRow(data, obj, i));
            i++;
        }
        //body = body + "</tbody>";
        return tbody;
    }

    function generateFoot(obj) {
        var tfoot = document.createElement('tfoot');
        //var foot = "<tfoot>";
        tfoot.append(generateFootRow(obj));
        //foot = foot + "</tfoot>";
        return tfoot;
    }

    function generateHeadRow(obj) {
        var row = document.createElement('tr');
        //var row = "<tr>";
        for (var key in obj) {
            row.append(generateHCell(key));
        }
        //row+="</tr>";
        return row;
    }

    function generateBodyRow(data, obj, index) {
        var row = document.createElement('tr');
        //var row = "<tr>";   

        for (var key in obj) {
            row.append(generateDCell(obj[key]));
        }

        var del_btn = document.createElement('button');
        del_btn.innerText = 'Delete';
        row.append(del_btn);

        del_btn.addEventListener('click', function () {
            data.splice(index, 1);
            generateTable(data);
        });

        var edit_btn = document.createElement('button');
        edit_btn.innerText = 'Edit';
        row.append(edit_btn);

        var save_btn = document.createElement('button');
        save_btn.innerText = 'Save';



        edit_btn.addEventListener('click', function () {
            edit_btn.style.display = "none";
            save_btn.style.display = "inline";
            row.innerHTML = "";
            var td = data[index];
            var arr = [];
            var inp = [];
            var m = 0;
            id = 0;
            for (var key in td) {
                row.append(generateDCell_with_input(td[key]));
                //console.log(row);
                arr[m] = document.getElementById("id" + (id - 1));
                inp[m] = arr[m].getAttribute('value');
                // console.log(inp[m]);
                m++;
            }

            //    console.log(inp);
            row.append(del_btn);
            row.append(save_btn);
            save_btn.addEventListener('click', function () {
                save_btn.style.display = "none";
                row.append(edit_btn);
                edit_btn.style.display = "inline";

                for (var j = 0; j < inp.length; j++) {
                    arr[j] = document.getElementById("id" + j);
                    arr[j].setAttribute('value', inp[j]);
                }

                editInfo = {
                    'Username': arr[0].value,
                    'Email': arr[1].value,
                    'DOB': arr[2].value,
                    'Time': arr[3].value,
                    'Color': arr[4].value
                };

                data.splice(index, 1, editInfo);

                generateTable(data);
            });

        });

        //row+="</tr>";
        return row;
    }


    function generateFootRow(obj) {
        var row = document.createElement('tr');
        //var row = "<tr>";
        for (var key in obj) {
            row.append(generateHCell(key));
        }
        //row+="</tr>";
        return row;
    }

    function generateHCell(value) {
        var th = document.createElement('th');
        th.append(value);
        th.style.padding = "0.7rem";

        var arrowdown = document.createElement("button");
        arrowdown.innerHTML = "&#9660;";
        arrowdown.style.padding = 0;
        arrowdown.style.margin = '0.5px';
        arrowdown.style.border = "none";
        th.append(arrowdown);

        var arrowup = document.createElement("button");
        arrowup.innerHTML = "&#9650;";
        arrowup.style.padding = 0;
        arrowup.style.margin = '0.5px';
        arrowup.style.border = "none";
        th.append(arrowup);



        if (value == 'Username') {
            arrowdown.addEventListener('click', function () {
                data1.sort(function (a, b) {
                    var nameA = a.Username.toUpperCase();
                    var nameB = b.Username.toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                generateTable(data1);
            });

            arrowup.addEventListener('click', function () {
                data1.sort(function (a, b) {
                    var nameA = a.Username.toUpperCase();
                    var nameB = b.Username.toUpperCase();

                    if (nameA < nameB) {
                        return 1;
                    }
                    if (nameA > nameB) {
                        return -1;
                    }
                    return 0;
                });
                generateTable(data1);
            });
        }

        if (value == 'Email') {
            arrowdown.addEventListener('click', function () {
                data1.sort(function (a, b) {
                    var nameA = a.Email.toUpperCase();
                    var nameB = b.Email.toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                generateTable(data1);
            });
            arrowup.addEventListener('click', function () {
                data1.sort(function (a, b) {
                    var nameA = a.Email.toUpperCase();
                    var nameB = b.Email.toUpperCase();

                    if (nameA < nameB) {
                        return 1;
                    }
                    if (nameA > nameB) {
                        return -1;
                    }
                    return 0;
                });
                generateTable(data1);
            });
        }

        if (value == 'DOB') {
            arrowdown.addEventListener('click', function () {
                data1.sort(function (a, b) {
                    return new Date(a.DOB) - new Date(b.DOB);
                });
                generateTable(data1);
            });
            arrowup.addEventListener('click', function () {
                data1.sort(function (a, b) {
                    return new Date(b.DOB) - new Date(a.DOB);
                });
                generateTable(data1);
            });
        }

        if (value == 'Time') {
            arrowdown.addEventListener('click', function () {
                data1.sort(function (a, b) {
                    return a.Time.localeCompare(b.Time);
                });
                generateTable(data1);
            });
            arrowup.addEventListener('click', function () {
                data1.sort(function (a, b) {
                    return b.Time.localeCompare(a.Time);
                });
                generateTable(data1);
            });
        }

        if (value == 'Color') {
            arrowdown.addEventListener('click', function () {
                data1.sort(function (a, b) {
                    var nameA = a.Color.toUpperCase();
                    var nameB = b.Color.toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                generateTable(data1);
            });
            arrowup.addEventListener('click', function () {
                data1.sort(function (a, b) {
                    var nameA = a.Color.toUpperCase();
                    var nameB = b.Color.toUpperCase();

                    if (nameA < nameB) {
                        return 1;
                    }
                    if (nameA > nameB) {
                        return -1;
                    }
                    return 0;
                });
                generateTable(data1);
            });
        }

        return th;
        //return "<th>"+column+"</th>";
    }

    function generateDCell(value) {
        var td = document.createElement('td');
        td.append(value);
        return td;
        //return "<td>" +value+ "</td>";
    }


    function generateDCell_with_input(value) {
        var td = document.createElement('td');
        var input = document.createElement('input');
        input.setAttribute('value', value);

        input.setAttribute('id', 'id' + id++);
        td.append(input);

        return td;

        //return "<td>" +value+ "</td>";
    }


    
    window.GenerateTable = generateTable;
})();