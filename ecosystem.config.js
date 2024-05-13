module.exports = {
  apps: [
    {
      name: 'dashboard', // 애플리케이션 이름
      script: 'npm', // 실행할 명령어
      args: 'run start', // npm run start 명령어 실행
      env: {
        NODE_ENV: 'production', // 환경 변수 설정
      },
    },
  ],
};
