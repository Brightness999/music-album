from os.path import exists

if __name__ == '__main__':
    f_path = './build/index.html'
    if not exists(f_path):
        print(f'index.html not found in build directory. Exiting...')
        exit()
    f = open(f_path, 'r')
    data = f.read().replace('/static/', '/assets/spa/')
    meta_string = "@if(isset($meta_string)){{$meta_string}}@endif"
    data = f"{data[:37]}{meta_string}{data[37:]}"
    f.close()
    f = open(f_path, 'w')
    f.write(data)
    f.close()
    print(f'index.html is ready for laravel deploy.')
