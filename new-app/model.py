import torch
import torch.nn as nn

class WordEmbedding(nn.Module):
    def __init__(self, vocab_size, embed_dim):
        """
        词嵌入层初始化
        
        参数:
            vocab_size: 词汇表大小
            embed_dim: 嵌入维度
        """
        super(WordEmbedding, self).__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
    
    def forward(self, x):
        """
        前向传播
        
        参数:
            x: 输入的词索引，形状为 (batch_size, seq_len)
        
        返回:
            词嵌入向量，形状为 (batch_size, seq_len, embed_dim)
        """
        return self.embedding(x)


# 使用示例
if __name__ == "__main__":
    print("开始执行model.py...")
    # 超参数设置
    vocab_size = 10000  # 词汇表大小
    embed_dim = 128     # 嵌入维度
    batch_size = 32     # 批次大小
    seq_len = 50        # 序列长度
    
    print(f"超参数设置: vocab_size={vocab_size}, embed_dim={embed_dim}, batch_size={batch_size}, seq_len={seq_len}")
    
    # 初始化词嵌入层
    print("初始化词嵌入层...")
    embedding_layer = WordEmbedding(vocab_size, embed_dim)
    
    # 模拟输入数据（随机生成的词索引）
    print("生成随机输入数据...")
    input_indices = torch.randint(0, vocab_size, (batch_size, seq_len))
    print(f"输入数据形状: {input_indices.shape}")
    
    # 获取词嵌入
    print("获取词嵌入...")
    embedded = embedding_layer(input_indices)
    print(f"输出形状: {embedded.shape}")
    
    print("执行完成!")