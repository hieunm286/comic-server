# For ECS:
FROM public.ecr.aws/r2d2z1z9/sotanext/node:14

# FROM node:14

ENV TZ="Asia/Ho_Chi_Minh"
WORKDIR /usr/app
RUN npm install -g nodemon

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x entrypoint.sh
EXPOSE 4500 3000

CMD ["/bin/bash", "./entrypoint.sh"]
