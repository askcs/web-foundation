package com.askcs.webpaigebase.servlet;

public class Pipe extends javax.servlet.http.HttpServlet
{
	private static final long serialVersionUID = -5775479483142835835L;
	String destination_host = "http://3rc2.ask-services.appspot.com";

		
	public void service(
			javax.servlet.http.HttpServletRequest req, 
			javax.servlet.http.HttpServletResponse res) 
					throws javax.servlet.ServletException, java.io.IOException
	{
					
		String path = req.getRequestURI();
		int firstSlash = path.indexOf('/', 1);
		if (firstSlash > 0) {
			System.out.println("cut:"+ path.substring(1, firstSlash) );
			path = path.substring(firstSlash);
		}
		
		String query = req.getQueryString(); 
		if( query != null && !query.equals("") )
		{
			//url_encode without already escaped ones..
			query = query.replaceAll("\\[", "%5B");
			query = query.replaceAll("\\]", "%5D");
			query = query.replaceAll("\\{", "%7B");
			query = query.replaceAll("\\}", "%7D");
			path += "?"+ query;
		}

		//read POST/PUT body  
		StringBuilder body = new StringBuilder();
		{
			java.io.InputStreamReader buff = new java.io.InputStreamReader( req.getInputStream() );
			char[] buf = new char[4096];
			int len;
			while( ( len= buff.read(buf,0,buf.length)) != -1 )
			{
				body.append(buf,0, len);
			}
		}

		// create new call
		java.net.URL url = null;
		java.net.HttpURLConnection connection = null;
		int responseCode = 503;
		try{
			url = new java.net.URL( destination_host + path );
			connection = (java.net.HttpURLConnection) url.openConnection();
			connection.setConnectTimeout( 60*1000 ); // might not work on GAE?
			connection.setRequestMethod( req.getMethod() );

			//TODO: copy ALL headers?
			if( req.getHeader("X-SESSION_ID") != null )
				connection.setRequestProperty("X-SESSION_ID", req.getHeader("X-SESSION_ID") );
			
			//TODO: copy cookieHeaders

			//attach body only on PUT/POST?
			if( body.length() > 0 )
			{
				connection.setDoOutput(true); 
				java.io.OutputStreamWriter writer = new java.io.OutputStreamWriter(connection.getOutputStream());
				writer.write( body.toString() );
				writer.close();
			}
			responseCode = connection.getResponseCode(); //block

			//fetch return data
			body.setLength(0); //clear
			{
				java.io.InputStreamReader buff = new java.io.InputStreamReader( connection.getInputStream() );
				char[] buf = new char[4096];
				int len;
				while( (len = buff.read(buf,0,buf.length)) != -1 )
				{
					body.append(buf,0, len);
				}
			}

	System.out.println(" IN| path:"+path + " body:"+body.length() );
	System.out.println("OUT| "+ responseCode +" "+ connection.getResponseMessage() + "  body:"+ body.length() );

			//return it 
			res.setContentType( connection.getContentType() );
			res.setStatus( responseCode );
			res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
			
			if( responseCode != 200 )
			{
				res.sendError(responseCode);
			}
			
			javax.servlet.ServletOutputStream out = res.getOutputStream();
			out.print( body.toString() );
			out.flush();
			
		}
		catch( java.io.IOException ioe)
		{
			System.out.println("# connection to "+ destination_host + path +" failed");
			res.setStatus( 503 );
			res.sendError( 503 );
			return;
		}

	}

}
