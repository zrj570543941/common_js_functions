/**
 * 把steps数组里的各项任务分时分批处理，从而避免浏览器的长时间运行时间限制
 * @param  {Array}   steps    每个数组元素代表一个需要分时分批处理的任务(一般是指方法的方法名)
 * @param  {Array}   args     要传入上面每个每个数组元素的参数
 * @param  {Function} callback(可选) 当steps里所有任务完成后的回调函数
 * @return {undefined}            
 */
function multistep(steps, args, callback) {
    var tasks = steps.concat(); //clone the array
    setTimeout(function() {
        //execute the next task
        var task = tasks.shift();
        task.apply(null, args || []);
        //determine if there's more
        if (tasks.length > 0) {
            setTimeout(arguments.callee, 25);
        } else {
            callback();
        }
    }, 25);
}


/*
    应用实例：
    //假设这是一个耗时很大的方法
    function saveDocument(id) {
        //save the document
        openDocument(id)
        writeText(id);
        closeDocument(id);
        //update the UI to indicate success
        updateUI(id);
    }
    // 可以变为：
    function saveDocument(id) {
        var tasks = [openDocument, writeText, closeDocument, updateUI];
        multistep(tasks, [id], function() {
            alert("Save completed!");
        });
    }
*/