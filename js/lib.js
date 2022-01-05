$(function() {
    function getMsg() {
        $.ajax({
            type: "get",
            url: "http://www.liulongbin.top:3006/api/getbooks",
            success: function(res) {
                if (res.status !== 200) return alert(res.msg);
                let arr = [];
                res.data.forEach(function(item) {
                        let tr = `<tr>
                        <td>${item.id}</td>
                        <td>${item.bookname}</td>
                        <td>${item.author}</td>
                        <td>${item.publisher}</td>
                        <td>
                            <a href="javascript:;" class = "del" data-index = "${item.id}">删除</a>
                        </td>
                    </tr>`;
                        arr.push(tr);
                    })
                    // console.log(arr);
                $("tbody").empty().append(arr.join(''));
            }
        });
    }
    getMsg();
    // 添加
    $("#btn_add").on("click", function() {
        $.ajax({
            type: "post",
            url: "http://www.liulongbin.top:3006/api/addbook",
            data: {
                bookname: $("#iptBookName").val().trim(),
                author: $("#iptAuthor").val().trim(),
                publisher: $("#iptPublisher").val().trim()
            },
            success: function(res) {
                if (res.status !== 201) return alert(res.msg);
                getMsg();
                $("#iptBookName").val('');
                $("#iptAuthor").val('');
                $("#iptPublisher").val('');
            }
        });
    });

    //删除
    $("tbody").on("click", ".del", function() {
        let index = $(this).attr("data-index");
        $.ajax({
            type: "get",
            url: "http://www.liulongbin.top:3006/api/delbook",
            data: {
                id: index,
            },
            success: function(res) {
                if (res.status !== 200) return alert(res.msg);
                getMsg();
            }
        });
    })
})