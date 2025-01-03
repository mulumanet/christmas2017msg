const confetti = document.getElementById('confetti');
        const ctx = confetti.getContext('2d');
        const startButton = document.getElementById('startButton');
        const message = document.getElementById('message');
        const messageTwo = document.getElementById('message2');
        const photoContainer = document.getElementById('photoContainer');
        const photo = document.getElementById('photo');
        const christmasMusic = document.getElementById('christmasMusic');

        confetti.width = window.innerWidth;
        confetti.height = window.innerHeight;

        const pieces = [];
        const numberOfPieces = 100;
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

        class Piece {
            constructor() {
                this.x = Math.random() * confetti.width;
                this.y = Math.random() * confetti.height - confetti.height;
                this.side = (Math.random() * 10) + 5;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.velocity = {
                    x: (Math.random() - 0.5) * 3,
                    y: (Math.random() * 3) + 1
                };
                this.rotation = Math.random() * 360;
                this.rotationSpeed = (Math.random() - 0.5) * 2;
            }

            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.rotation += this.rotationSpeed;

                if (this.y > confetti.height) {
                    this.y = -this.side;
                }
                if (this.x > confetti.width + this.side) {
                    this.x = -this.side;
                }
                if (this.x < -this.side) {
                    this.x = confetti.width + this.side;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation * Math.PI / 180);
                ctx.fillStyle = this.color;
                ctx.fillRect(-this.side / 2, -this.side / 2, this.side, this.side);
                ctx.restore();
            }
        }

        for (let i = 0; i < numberOfPieces; i++) {
            pieces.push(new Piece());
        }

        function animate() {
            ctx.clearRect(0, 0, confetti.width, confetti.height);
            pieces.forEach(piece => {
                piece.update();
                piece.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();

        const photos = [
           `./asset/gena1.jpg`,
           `./asset/gena2.jpg`,
           `./asset/gena3.jpg`,
           `./asset/gena4.jpg`,
           `./asset/gena5.jpg`,
           `./asset/gena6.jpg`,
           `./asset/gena7.jpg`,
           `./asset/gena8.jpg`,
           `./asset/gena9.jpg`,
           `./asset/gena10.jpg`
           
        ];
        
        let currentPhotoIndex = 0;

        function changePhoto() {
            photo.style.opacity = '0';
            setTimeout(() => {
                photo.src = photos[currentPhotoIndex];
                photo.style.opacity = '1';
                currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            }, 500);
        }

        startButton.addEventListener('click', () => {
            startButton.style.display = 'none';
            message.textContent = 'እንኳን ለ2017 የገና በዓል በሰላም በጤና አደረሰህ/ሽ!';
            message.style.opacity = '1';
            photoContainer.style.width = '300px';
            photoContainer.style.height = '300px';
            messageTwo.textContent = 'በዓሉ የሰላም የፍቅር የጤና ይሁንልሽ/ህ!';
            messageTwo.style.opacity = '1';
            setTimeout(() => {
                changePhoto();
                setInterval(changePhoto, 3000);
            }, 1000);
            christmasMusic.play();
        });

        window.addEventListener('resize', () => {
            confetti.width = window.innerWidth;
            confetti.height = window.innerHeight;
        });
