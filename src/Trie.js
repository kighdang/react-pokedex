let instance;

class TrieNode {
    constructor(value) {
        this.isEnd = false;
        this.children = {};
        this.value = value
    }
}

class Trie {
    constructor() {
        if (instance){
            throw new Error("You can only create one instance!");
        }

        this.root = new TrieNode('');
        instance = this;

    }


    insert(word) {
        let node = this.root;
    
        for (let i = 0; i < word.length; i++){
            let char = word[i];
    
            if (!node.children[char]) {
                node.children[char] = new TrieNode(char);
            }
    
            node = node.children[char];
        }
    
        node.isEnd = true;
    }
    
    findSuggestions(prefix) {
        var node = this.root;
        var suggestions = [];

        for (let char of prefix) {
            node = node.children[char];
            if (node == null)
                return suggestions;
        }
        
        this.helperFindSuggestions(node, prefix.substring(0, prefix.length-1), suggestions);
        return suggestions
    }

    helperFindSuggestions(node, prefix, suggestions){
        if (node.isEnd)
            suggestions.push(prefix + node.value);

        for (let child in node.children)
            this.helperFindSuggestions(node.children[child], prefix + node.value, suggestions);

        
    }

}

export default Trie;