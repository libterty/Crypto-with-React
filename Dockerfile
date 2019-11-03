# 建立image鏡像
FROM node
# 建立docker目錄檔存放鏡像
WORKDIR /usr/src/app
# 在目錄內安裝套件
COPY package*.json ./
RUN npm install
# 把所有文件移植進目錄
COPY . .
# 預設port
EXPOSE 8080
# 執行
CMD ["npm", "start"]