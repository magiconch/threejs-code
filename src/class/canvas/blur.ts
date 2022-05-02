import { GPU, KernelFunction, IKernelRunShortcut } from 'gpu.js';

// [基于Canvas实现的高斯模糊](https://zhuanlan.zhihu.com/p/98356516)
// [高斯模糊的算法](https://www.ruanyifeng.com/blog/2012/11/gaussian_blur.html)
// [高斯函数](https://www.cnblogs.com/pacino12134/p/11372555.html)

function gaussBlur(imgData: ImageData, radius: number): ImageData {
    //
    const pixes = new Uint8ClampedArray(imgData.data);
    const width = imgData.width;
    const height = imgData.height;

    // 对radius取整
    radius = Math.floor(radius);

    // 高斯滤波器宽度(决定着平滑程度)是由参数σ表征的，而且σ和平滑程度的关系是非常简单的。
    // σ越大，高斯滤波器的频带就越宽，平滑程度就越好。
    // 通过调节平滑程度参数σ，可在图像特征过分模糊(过平滑)与平滑图像中由于噪声和细纹理所引起的过多的不希望突变量(欠平滑)之间取得折衷。
    const sigma = radius / 2;



    const gaussMatrix = new GaussMatrix(radius, sigma);

    // x 方向的一维高斯运算
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // RGBA的值
            let r = 0, g = 0, b = 0, a = 0;
            let i = 0, w = 0, gaussSum = 0;
            for (let j = -radius; j <= radius; j++) {
                // j 表示x的偏移量
                const k = x + j;
                // 这里不需要考虑超出边界的像素点
                if (k >= 0 && k < width) {
                    // i 表示当前的像素点坐标
                    // *4 相当于每一次步进4
                    // (y * width + k) 因为ImageData本身是一个一维向量，这里做一个简单的换行
                    i = (y * width + k) * 4;

                    w = gaussMatrix.gaussMatrix[j + radius];

                    r += pixes[i] * w;
                    g += pixes[i + 1] * w;
                    b += pixes[i + 2] * w;
                    a += pixes[i + 3] * w;

                    gaussSum += w;
                }
            }

            // 同理上面的方程
            i = (y * width + x) * 4;

            //计算加权均值
            imgData.data.set([r, g, b, a].map(v => v / gaussSum), i);
        }
    }

    pixes.set(imgData.data);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // RGBA的值
            let r = 0, g = 0, b = 0, a = 0;
            let i = 0, w = 0, gaussSum = 0;
            for (let j = -radius; j <= radius; j++) {
                const k = y + j;

                if (k >= 0 && k < height) {
                    i = (k * width + x) * 4;
                    w = gaussMatrix.gaussMatrix[j + radius];

                    r += pixes[i] * w;
                    g += pixes[i + 1] * w;
                    b += pixes[i + 2] * w;
                    a += pixes[i + 3] * w;

                    gaussSum += w;
                }
            }
            i = (y * width + x) * 4;
            imgData.data.set([r, g, b, a].map(v => v / gaussSum), i);
        }
    }

    return imgData;
}

function gaussBlurGPUVersion(imgData: ImageData, radius: number): ImageData {
    //
    const pixes = new Uint8ClampedArray(imgData.data);
    const width = imgData.width;
    const height = imgData.height;

    // 对radius取整
    radius = Math.floor(radius);

    // 高斯滤波器宽度(决定着平滑程度)是由参数σ表征的，而且σ和平滑程度的关系是非常简单的。
    // σ越大，高斯滤波器的频带就越宽，平滑程度就越好。
    // 通过调节平滑程度参数σ，可在图像特征过分模糊(过平滑)与平滑图像中由于噪声和细纹理所引起的过多的不希望突变量(欠平滑)之间取得折衷。
    const sigma = radius / 2;

    const gaussMatrix = new GaussMatrix(radius, sigma);

    const gpu = new GPU();






    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // RGBA的值
            let r = 0, g = 0, b = 0, a = 0;
            let i = 0, w = 0, gaussSum = 0;
            for (let j = -radius; j <= radius; j++) {
                // j 表示x的偏移量
                const k = x + j;
                // 这里不需要考虑超出边界的像素点
                if (k >= 0 && k < width) {
                    // i 表示当前的像素点坐标
                    // *4 相当于每一次步进4
                    // (y * width + k) 因为ImageData本身是一个一维向量，这里做一个简单的换行
                    i = (y * width + k) * 4;

                    w = gaussMatrix.gaussMatrix[j + radius];

                    r += pixes[i] * w;
                    g += pixes[i + 1] * w;
                    b += pixes[i + 2] * w;
                    a += pixes[i + 3] * w;

                    gaussSum += w;
                }
            }

            // 同理上面的方程
            i = (y * width + x) * 4;

            //计算加权均值
            imgData.data.set([r, g, b, a].map(v => v / gaussSum), i);
        }
    }

    pixes.set(imgData.data);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // RGBA的值
            let r = 0, g = 0, b = 0, a = 0;
            let i = 0, w = 0, gaussSum = 0;
            for (let j = -radius; j <= radius; j++) {
                const k = y + j;

                if (k >= 0 && k < height) {
                    i = (k * width + x) * 4;
                    w = gaussMatrix.gaussMatrix[j + radius];

                    r += pixes[i] * w;
                    g += pixes[i + 1] * w;
                    b += pixes[i + 2] * w;
                    a += pixes[i + 3] * w;

                    gaussSum += w;
                }
            }
            i = (y * width + x) * 4;
            imgData.data.set([r, g, b, a].map(v => v / gaussSum), i);
        }
    }

    return imgData;
}

class GaussMatrix {
    public readonly gaussMatrix: number[];

    public readonly radius: number;
    public readonly sigma: number;

    constructor(radius: number, sigma: number) {
        this.radius = radius;
        this.sigma = sigma;
        this.gaussMatrix = this.createGaussMatrix(this.radius, this.sigma);
    }



    private createGaussMatrix(radius: number, sigma: number): number[] {
        const result: number[] = [];

        // 这里使用的是一维高斯函数
        const a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
        const b = -1 / (2 * sigma * sigma);

        for (let i = -radius; i <= radius; i++) {
            result.push(a * Math.exp(b * i * i));
        }

        return result;
    }
}

function test() {
    const img = new Image();
    img.src = "../../asset/image/Pokemon.webp";

    const canvasDom = document.createElement("canvas") as HTMLCanvasElement;
    canvasDom.width = window.innerWidth;
    canvasDom.height = window.innerHeight;

    const ctx = canvasDom.getContext("2d") as CanvasRenderingContext2D;

    img.onload = function () {
        ctx.drawImage(img, 0, 0);
        let imgdata = ctx.getImageData(0, 0, img.width, img.height);
        imgdata = gaussBlurGPUVersion(imgdata, 9);
        ctx.putImageData(imgdata, 0, 0);
    }

    document.body.appendChild(canvasDom);
}

function test2GPU() {

    const canvasDom = document.createElement("canvas") as HTMLCanvasElement;
    canvasDom.width = window.innerWidth;
    canvasDom.height = window.innerHeight;
    const ctx = canvasDom.getContext("2d") as CanvasRenderingContext2D;
    const gpu = new GPU();
    const image = new Image();
    image.src = "../../asset/image/Pokemon.webp";
    const kernel = gpu.createKernel(function (image) {
        const pixel = (image as any)[this.thread.y][this.thread.x];
        return [pixel[0], pixel[1],pixel[2] , pixel[3]];
    }, {
        output: [4]
    });
    image.onload = async function () {
        const imageBitmapPromise = createImageBitmap(image, 0, 0, image.width, image.height);
        const imageBitmap = await imageBitmapPromise;
        const result = kernel(imageBitmap);
        console.log(result)
        ctx.drawImage(result as unknown as ImageBitmap, 0, 0);
        await gpu.destroy();
    };

    document.body.appendChild(canvasDom);

}

test2GPU()


// test();