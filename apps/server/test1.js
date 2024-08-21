function solveNQueens(n) {
    const pos = [];
    const map = new Array(n).fill(0).map(()=>new Array(n).fill(0));
    const isvalid = (i, j) => {
        //行内
        for(let k = 0; k < n; k++){
            if(map[i][k]) return false;
        }
        //列内
        for(let k = 0; k < n; k++){
            if(map[k][j]) return false;
        }
        // 左上斜线
        // 假如当前点是(3,2) 左上就是(2,1) (1,0)  j-i=-1
        const lt = j - i
        for(let k = 0; k < n; k++){
            if(k + lt < 0 || k+lt >= n) continue;
            if(map[k][k+lt]) return false
        }
        // 右上斜线
        // 假如当前点是(3,2) 右上就是(2,3) (1,4) i+j = 5;
        const rt = j + i;
        for(let k = 0; k < n; k++){
            if(rt-k < 0 || rt-k >= n) continue;
            if(map[k][rt-k]) return false;
        }
        return true;
    }
    const dfs = (i,cur)=>{
        if(i === n){
            pos.push([...cur]);
            return;
        }
        for(let j = 0; j<n; j++){
            if(!isvalid(i,j)) continue;
            map[i][j] = 1;
            dfs(i+1,[...cur,j]);
            map[i][j] = 0
        }
    }
    dfs(0,[]);
    const res = [];
    const convert = (pos)=>{
        pos.forEach(map=>{
            const temp = [];
            map.forEach(item=>{
                let t  = '';
                for(let k = 0; k < n; k++){
                    if(k === item) t += 'Q';
                    else t += '.';
                };
                temp.push(t);
            })
            res.push(temp);
        })
    }
    convert(pos);
    return res;
};
solveNQueens(8)