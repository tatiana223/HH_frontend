export const Login = async (username: string, password: string): Promise<string> => {
    const response = await fetch(`/api/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) { 
      console.log("Errorrrr");
      const errorText = await response.text();  // Читаем текст ошибки
      throw new Error(errorText || 'Ошибка авторизации');
    }
    
    const data = await response.text();
    console.log('Ответ от сервера:', data);
    return data; 
  };