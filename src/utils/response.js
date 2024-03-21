class Response {
    constructor(data = null, message = null) {
        this.data = data
        this.message = message
    } 

    success(res) {
        return res.status(200).json({
            success: true,
            data: {...this.data?._doc,token:this.data?.token},
            message: this.message ?? "Success"
        })
    }

    created(res) {
        return res.status(201).json({
            success: true,
            data: this.data,
            message: this.message ?? "Created"
        })
    }

    error500(res) {
        return res.status(500).json({
            success: false,
            data: this.data,
            message: this.message ?? "Error 500"
        })
    }

    error400(res) {
        return res.status(400).json({
            success: false,
            data: this.data,
            message: this.message ?? "Error 400"
        })
    }

    error401(res) {
        return res.status(401).json({
            success: false,
            data: this.data,
            message: this.message ?? "Error 401"
        })
    }

    error404(res) {
        return res.status(404).json({
            success: false,
            data: this.data,
            message: this.message ?? "Error 404"
        })
    }

    error429(res) {
        return res.status(429).json({
            success: false,
            data: this.data,
            message: this.message ?? "Error 429"
        })
    }

}

module.exports = Response