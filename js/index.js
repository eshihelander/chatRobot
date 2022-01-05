// 刷新页面时调接口获取数据
getMsg();

function getMsg() {

    $.get('http://www.liulongbin.top:3006/api/getbooks', function(res) {
        if (res.status !== 200) return alert('未获取到数据');
        // console.log(res);
        // 每次获取数据前先清空tobdy表格里的内容
        $("tbody").empty();
        $.each(res.data, function(index, item) {
            var tr = '<tr><td>' + item.id + '</td><td>' + item.bookname + '</td><td>' + item.author + '</td><td>' + item.publisher + '</td><td><a href="javascript:;" id = "del" data-index = ' + item.id + '>删除</a></td></tr>';
            //     var tr = `<tr>
            //     <td>${item.id}</td>
            //     <td>${item.bookname}</td>
            //     <td>${item.author}</td>
            //     <td>${item.publisher}</td>
            //     <td><a href="javascript:;">删除</a></td>
            // </tr>`;
            $("tbody").append(tr); // 这里没有用join方法也行得通 这个渲染内容的本质还得再研究下
        })
    });
};
// 添加新图书
// 1、给添加按钮绑定点击事件
$("#btn_add").on("click", function() {
    // console.log(1);
    // 获取输入的图书内容
    var bookName = $("#iptBookName").val();
    var Author = $("#iptAuthor").val();
    var Publisher = $("#iptPublisher").val();
    var newData = { bookname: bookName, author: Author, publisher: Publisher };
    // 2、向服务器提交数据
    $.post("http://www.liulongbin.top:3006/api/addbook", newData,
        function(res) {
            console.log(res);
            if (res.status !== 201) return alert("添加失败");
        },
    );
    // 提交数据后清空Input框的内容
    $("#iptBookName").val('');
    $("#iptAuthor").val('');
    $("#iptPublisher").val('');
    // 数据提交后重新渲染页面
    getMsg();
});
// 删除图书
// 3、给删除按钮绑定点击事件
// $("#del").onclick = function(){} 错误 
$("tbody").on("click", "#del", function() {
    var id = $(this).attr("data-index");
    // console.log(id);
    // 发送get带参数请求到删除接口
    $.get("http://www.liulongbin.top:3006/api/delbook", { id: id },
        function(res) {
            console.log(res);
            if (res.status !== 200) alert("删除失败");
            // 删除数据后重新渲染页面
            getMsg();
        },
    );

})