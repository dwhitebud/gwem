const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTestUser() {
  const email = 'test2@example.com'; 
  const password = 'testpassword123';
  
  try {
    // Create the user in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      return;
    }

    const userId = authUser.user.id;
    console.log('Auth user created successfully:', authUser);
    console.log('Generated UUID:', userId);

    // Create the user in public.users
    const { data: publicUser, error: publicError } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: email,
      })
      .select()
      .single();

    if (publicError) {
      console.error('Error creating public user:', publicError);
      return;
    }

    console.log('Public user created successfully:', publicUser);
    
    // Save the UUID to a file for future reference
    const fs = require('fs');
    fs.writeFileSync('test-user-id.txt', userId);
    console.log('Saved user ID to test-user-id.txt');
    
    console.log('\nTest user credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User ID:', userId);
  } catch (error) {
    console.error('Error:', error);
  }
}

createTestUser().catch(console.error);
