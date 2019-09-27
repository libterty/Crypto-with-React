FROM node
RUN npm install -g crytochain
COPY ./serve ./serve
CMD crytochain ./serve